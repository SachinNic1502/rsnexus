import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email: string;
  phone?: string;
  isFounder: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    isFounder: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
