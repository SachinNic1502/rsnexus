import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobOpening extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experienceLevel: string;
  salaryRange?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: "active" | "draft" | "closed";
  deadline?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobOpeningSchema: Schema = new Schema<IJobOpening>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, default: "Remote (India)", trim: true },
    type: { type: String, default: "Full-time", trim: true },
    experienceLevel: { type: String, default: "1-3 Years", trim: true },
    salaryRange: { type: String, default: "Competitive / Best in Industry" },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "draft", "closed"],
      default: "active",
    },
    deadline: { type: Date },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const JobOpening: Model<IJobOpening> =
  mongoose.models.JobOpening || mongoose.model<IJobOpening>("JobOpening", JobOpeningSchema);
