import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in_discussion" | "converted" | "closed";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    service: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "in_discussion", "converted", "closed"],
      default: "new",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
