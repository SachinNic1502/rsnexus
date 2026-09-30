import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  designation: string;
  quote: string;
  src?: string;
  projectSlug?: string;
  rating: number;
  isApproved: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    quote: { type: String, required: true },
    src: { type: String, default: "" },
    projectSlug: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    isApproved: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
