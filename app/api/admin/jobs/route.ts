import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobOpening } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

import fallbackCareers from "@/data/careers.json";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, jobs: fallbackCareers, isFallback: true });
    }

    const jobs = await JobOpening.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, jobs });
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
        { success: false, error: "Database not connected. Please define MONGODB_URI in your .env.local file to persist new job openings." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const job = await JobOpening.create(body);

    // Revalidate public careers paths
    revalidatePath("/careers");
    revalidatePath(`/careers/${job.slug}`);

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
