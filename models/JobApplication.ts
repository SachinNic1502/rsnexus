import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  candidateName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl: string;
  coverLetter?: string;
  status: "submitted" | "reviewing" | "shortlisted" | "interview" | "rejected" | "hired";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "JobOpening", required: true },
    candidateName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    portfolioUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String, default: "" },
    status: {
      type: String,
      enum: ["submitted", "reviewing", "shortlisted", "interview", "rejected", "hired"],
      default: "submitted",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
