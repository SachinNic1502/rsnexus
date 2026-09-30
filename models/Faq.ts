import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: string;
  isFeaturedOnContact: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema: Schema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General", trim: true },
    isFeaturedOnContact: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Faq: Model<IFaq> =
  mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);
