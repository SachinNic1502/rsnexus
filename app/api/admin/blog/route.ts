import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

import fallbackBlog from "@/data/blog.json";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      const formatted = fallbackBlog.map((p: any, i: number) => ({
        ...p,
        _id: p._id || p.slug || `blog-${i}`,
      }));
      return NextResponse.json({ success: true, posts: formatted, isFallback: true });
    }

    const posts = await BlogPost.find().sort({ publishedDate: -1 }).lean();
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database not connected. Please define MONGODB_URI in your .env.local file to publish articles." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const post = await BlogPost.create({
      ...body,
      publishedDate: body.publishedDate ? new Date(body.publishedDate) : new Date(),
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
