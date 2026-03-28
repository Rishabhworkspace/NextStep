import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  userId: string;
  // Step 1: Personal
  fullName: string;
  college: string;
  degree: string;
  yearOfStudy: string;
  isFirstGen: boolean;
  
  // Step 2: Academic
  cgpa: number;
  stream: string;
  confidentSubjects: string[];
  weakSubjects: string[];
  
  // Step 3: Career
  targetRole: string;
  companyType: string;
  timeline: string;
  
  // Step 4: Skills
  currentSkills: Array<{
    name: string;
    proficiency: number; // 1 to 100
  }>;
  
  // Step 5: Financial
  needsAssistance: boolean;
  incomeBracket?: string;
  scholarshipPrefs: string[];
  
  // Meta
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  
  fullName: { type: String, default: '' },
  college: { type: String, default: '' },
  degree: { type: String, default: '' },
  yearOfStudy: { type: String, default: '' },
  isFirstGen: { type: Boolean, default: false },
  
  cgpa: { type: Number, default: 0 },
  stream: { type: String, default: '' },
  confidentSubjects: [{ type: String }],
  weakSubjects: [{ type: String }],
  
  targetRole: { type: String, default: '' },
  companyType: { type: String, default: '' },
  timeline: { type: String, default: '' },
  
  currentSkills: [{
    name: { type: String },
    proficiency: { type: Number, min: 0, max: 100 }
  }],
  
  needsAssistance: { type: Boolean, default: false },
  incomeBracket: { type: String },
  scholarshipPrefs: [{ type: String }],
  
  completionPercentage: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Calculate completion percentage before saving
ProfileSchema.pre('save', function(next) {
  const profile = this as unknown as IProfile;
  let completedFields = 0;
  const totalFields = 12; // Key essential fields

  if (profile.fullName) completedFields++;
  if (profile.college) completedFields++;
  if (profile.degree) completedFields++;
  if (profile.yearOfStudy) completedFields++;
  
  if (profile.cgpa > 0) completedFields++;
  if (profile.stream) completedFields++;
  if (profile.confidentSubjects && profile.confidentSubjects.length > 0) completedFields++;
  
  if (profile.targetRole) completedFields++;
  if (profile.companyType) completedFields++;
  
  if (profile.currentSkills && profile.currentSkills.length > 0) completedFields++;
  
  if (profile.needsAssistance !== undefined) completedFields++;
  if (profile.scholarshipPrefs && profile.scholarshipPrefs.length > 0) completedFields++;

  profile.completionPercentage = Math.round((completedFields / totalFields) * 100);
  next();
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
