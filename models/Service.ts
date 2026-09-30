import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  serviceId: string;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: string[];
  deliverables: string;
  typicalTimeline: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema<IService>(
  {
    serviceId: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    iconName: { type: String, default: "Code" },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    technologies: [{ type: String }],
    deliverables: { type: String, default: "" },
    typicalTimeline: { type: String, default: "2 - 4 weeks" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
