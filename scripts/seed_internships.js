const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Schema Definition (Mirrors src/lib/db/models/Internship.ts)
const InternshipSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  domain: { type: String, required: true, index: true },
  location: { type: String, required: true },
  availability: { type: String, enum: ["year_round", "seasonal"], required: true, index: true },
  season: { type: String, default: null },
  applicationWindow: { type: String, default: null },
  degreeType: [{ type: String }],
  yearEligibility: [{ type: String, index: true }],
  skillsRequired: [{ type: String }],
  selectionProcess: [{ type: String }],
  stipendMin: { type: Number, default: null, index: true },
  stipendMax: { type: Number, default: null },
  stipendNote: { type: String, default: null },
  difficulty: { type: String, enum: ["Low", "Medium", "Medium-High", "High", "Very High"], default: "Medium" },
  applyUrl: { type: String, required: true },
}, { timestamps: true });

const Internship = mongoose.models.Internship || mongoose.model("Internship", InternshipSchema);

const docxFiles = [
  { filter: "SoftwareDev", file: 'Internships/Software dev internships.docx' },
  { filter: "AI_ML", file: 'Internships/AI_ML_updated_with_links.docx' },
  { filter: "DataScience", file: 'Internships/Data_Science_updated_with_links.docx' },
  { filter: "Cybersecurity", file: 'Internships/CYBERSECURITY INTERNSHIPS.docx' },
  { filter: "Cloud Computing", file: 'Internships/Cloud Computing.docx' },
  { filter: "Game Development", file: 'Internships/GAME DEVELOPMENT.docx' },
  { filter: "IoT", file: 'Internships/IOT AND EMBEDDED SYSTEM.docx' },
  { filter: "Mechanical", file: 'Internships/Mechanical Engineering Internships.docx' },
  { filter: "Research", file: 'Internships/CSE RESEARCH AND ACADEMIA.docx' },
];

function parseStipend(text) {
  let min = null;
  let max = null;
  let note = null;
  const match = text.match(/₹([0-9.]+|[0-9]+[KLkl]?)\s*[-–to]+\s*₹?([0-9.]+[KLkl]?)/);
  if (match) {
    const parseVal = (val) => {
      let numStr = val.replace(/[^0-9.]/g, '');
      let multiplier = 1;
      if (val.toLowerCase().includes('k')) multiplier = 1000;
      if (val.toLowerCase().includes('l')) multiplier = 100000;
      return parseFloat(numStr) * multiplier;
    };
    min = parseVal(match[1]);
    max = parseVal(match[2]);
  } else if (text.toLowerCase().includes('unpaid')) {
    note = "Unpaid";
  } else {
    note = text.trim();
  }
  return { min, max, note };
}

function extractNumber(text) {
    return text.replace(/[^0-9]/g, '');
}

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI in .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing
  await Internship.deleteMany({});
  console.log("Cleared existing internships.");

  for (const doc of docxFiles) {
    const fullPath = path.join(__dirname, '../', doc.file);
    if (!fs.existsSync(fullPath)) continue;

    console.log(`Processing ${doc.filter}...`);
    const { value: text } = await mammoth.extractRawText({ path: fullPath });
    
    // Split text by common company headers like 🔵, 🟢, 🟣, 🟠, 🟡, 🔴, ⚡, etc.
    // Sometimes it's formatting like text followed by "Apply Link:"
    const entries = text.split(/(?:🔵|🟢|🟣|🟠|🟡|🔴|⚡|➡️)/g).map(s => s.trim()).filter(s => s.length > 50 && s.includes('Role:'));

    for (const entry of entries) {
      try {
        const lines = entry.split('\n').map(l => l.trim()).filter(l => l);
        
        let company = '';
        let role = '';
        let location = '';
        let availability = "year_round";
        let season = null;
        let diff = "Medium";
        let applyUrl = '';
        let yearArr = [];
        let degreeArr = [];
        let skillsArr = [];
        let processArr = [];
        let stipendInfo = { min: null, max: null, note: null };

        let currSection = 'header'; // header, eligibility, skills, selection, stipend, difficulty
        
        // Extract Company Name from first line (sometimes contains Apply Link)
        const firstLine = lines[0];
        if (firstLine.includes('Apply Link:')) {
            company = firstLine.split('Apply Link:')[0].replace(/[^a-zA-Z0-9\s&]/g, '').trim();
            if (!applyUrl) {
               applyUrl = 'https://' + firstLine.split('https://')[1]?.trim();
            }
        } else {
           company = firstLine.replace(/[^a-zA-Z0-9\s&]/g, '').trim();
           // some company lines are like "Google - SWE Intern"
           if (company.includes('-')) company = company.split('-')[0].trim();
        }

        for (let i = 0; i < lines.length; i++) {
          const l = lines[i];
          const lLower = l.toLowerCase();

          if (l.startsWith('Role:')) role = l.replace('Role:', '').trim();
          else if (l.startsWith('Location:')) location = l.replace('Location:', '').trim();
          else if (l.startsWith('Availability:')) {
             if (lLower.includes('seasonal') || lLower.includes('summer') || lLower.includes('winter')) {
                 availability = "seasonal";
                 if (lLower.includes('summer')) season = "Summer";
                 if (lLower.includes('winter')) season = "Winter";
             }
          }
          else if (lLower.includes('eligibility')) currSection = 'eligibility';
          else if (lLower.includes('skills')) currSection = 'skills';
          else if (lLower.includes('selection process')) currSection = 'selection';
          else if (lLower.includes('stipend')) currSection = 'stipend';
          else if (lLower.includes('difficulty')) currSection = 'difficulty';
          else if (lLower.includes('apply:')) {
             applyUrl = l.replace('🔗', '').replace('Apply:', '').trim();
          }
          else {
              // Parse within sections
              if (currSection === 'eligibility') {
                  if (l.startsWith('Degree:')) degreeArr = l.replace('Degree:', '').split(/[/\s]+/).filter(x => x).map(x=>x.trim().replace(/[^a-zA-Z.0-9]/g, ''));
                  if (l.startsWith('Year:')) {
                      yearArr = [];
                      if (l.includes('1st')) yearArr.push('1st year');
                      if (l.includes('2nd')) yearArr.push('2nd year');
                      if (l.includes('3rd')) yearArr.push('3rd year');
                      if (l.includes('4th')) yearArr.push('4th year');
                      if (lLower.includes('pg') || lLower.includes('fresh')) yearArr.push('PG');
                  }
              }
              else if (currSection === 'skills' && !lLower.includes('selection')) {
                  if (l && !l.includes(':')) skillsArr.push(l.trim());
              }
              else if (currSection === 'selection' && !lLower.includes('stipend')) {
                  if (l && !l.includes(':') && l.length > 3) processArr.push(l.trim());
              }
              else if (currSection === 'stipend' && !lLower.includes('difficulty')) {
                  stipendInfo = parseStipend(l);
                  currSection = 'done'; // process first valid stipend line only
              }
              else if (currSection === 'difficulty' && !lLower.includes('apply')) {
                  const dmatch = l.replace('⭐', '').trim();
                  if (dmatch.includes('High') && dmatch.includes('Medium')) diff = "Medium-High";
                  else if (dmatch.includes('Very')) diff = "Very High";
                  else if (dmatch.includes('High')) diff = "High";
                  else if (dmatch.includes('Medium')) diff = "Medium";
                  else if (dmatch.includes('Low')) diff = "Low";
              }
          }
        }

        if (company && role) {
            await Internship.create({
                company: company || "Unknown Co",
                role: role,
                domain: doc.filter,
                location: location || "PAN India",
                availability: availability,
                season: season,
                degreeType: degreeArr.length ? degreeArr : ["B.Tech"],
                yearEligibility: yearArr.length ? yearArr : ["3rd year", "4th year"],
                skillsRequired: skillsArr.slice(0, 5),
                selectionProcess: processArr.slice(0, 3),
                stipendMin: stipendInfo.min || null,
                stipendMax: stipendInfo.max || null,
                stipendNote: stipendInfo.note || (stipendInfo.min ? null : "Not Disclosed"),
                difficulty: diff,
                applyUrl: applyUrl || "https://google.com"
            });
        }
      } catch (err) {
          console.error(`Error processing entry in ${doc.filter}:`, err.message);
      }
    }
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
