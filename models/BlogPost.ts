import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: Date;
  author: string;
  authorId?: mongoose.Types.ObjectId;
  content: string[];
  coverImage?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    readTime: { type: String, default: "5 min read" },
    publishedDate: { type: Date, default: Date.now },
    author: { type: String, default: "Sachin Rathod" },
    authorId: { type: Schema.Types.ObjectId, ref: "TeamMember" },
    content: [{ type: String }],
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
