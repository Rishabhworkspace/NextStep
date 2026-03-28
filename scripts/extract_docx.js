const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxFiles = [
  'Internships/Software dev internships.docx',
  'Internships/AI_ML_updated_with_links.docx',
  'Internships/Data_Science_updated_with_links.docx',
  'Internships/CYBERSECURITY INTERNSHIPS.docx',
  'Internships/Cloud Computing.docx',
  'Internships/GAME DEVELOPMENT.docx',
  'Internships/IOT AND EMBEDDED SYSTEM.docx',
  'Internships/Mechanical Engineering Internships.docx',
  'Internships/CSE RESEARCH AND ACADEMIA.docx',
];

(async () => {
  for (const f of docxFiles) {
    const fullPath = path.join('c:/Rishabh/NextStep-1', f);
    try {
      const result = await mammoth.extractRawText({ path: fullPath });
      console.log(`\n${'='.repeat(60)}`);
      console.log(`FILE: ${path.basename(f)}`);
      console.log('='.repeat(60));
      // Print first 4000 chars to understand the structure
      console.log(result.value.substring(0, 4000));
    } catch (err) {
      console.error(`Error reading ${f}:`, err.message);
    }
  }
})();
