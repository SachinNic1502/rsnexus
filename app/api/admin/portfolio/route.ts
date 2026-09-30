import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

import fallbackProjectsData from "@/data/projects.json";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      const formatted = fallbackProjectsData.projects.map((p: any, i: number) => ({
        ...p,
        _id: p._id || p.slug || `project-${i}`,
      }));
      return NextResponse.json({ success: true, projects: formatted, isFallback: true });
    }

    const projects = await Project.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, projects });
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
        { success: false, error: "Database not connected. Please define MONGODB_URI in your .env.local file to add portfolio projects." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const count = await Project.countDocuments();
    const project = await Project.create({
      ...body,
      order: body.order ?? count,
    });

    revalidatePath("/portfolio");
    revalidatePath("/");
    revalidatePath(`/portfolio/${project.slug}`);

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
