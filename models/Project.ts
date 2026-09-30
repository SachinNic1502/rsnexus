import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITechnology {
  name: string;
  description?: string;
}

export interface ICaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  architecture: string;
  outcome: string;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  label: string;
  description: string;
  images: string[];
  technologies: ITechnology[];
  features: string[];
  results: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  isClientWork: boolean;
  order: number;
  caseStudy?: ICaseStudy;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    label: { type: String, default: "Client Project", trim: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    technologies: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
      },
    ],
    features: [{ type: String }],
    results: [{ type: String }],
    tags: [{ type: String }],
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    isClientWork: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    caseStudy: {
      overview: { type: String, default: "" },
      challenge: { type: String, default: "" },
      solution: { type: String, default: "" },
      architecture: { type: String, default: "" },
      outcome: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
