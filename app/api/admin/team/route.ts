import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TeamMember } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

import fallbackTeam from "@/data/team.json";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      const formatted = fallbackTeam.map((m: any, i: number) => ({
        ...m,
        _id: m._id || m.email || `team-${i}`,
      }));
      return NextResponse.json({ success: true, members: formatted, isFallback: true });
    }

    const members = await TeamMember.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, members });
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
        { success: false, error: "Database not connected. Please define MONGODB_URI in your .env.local file to add team members." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const count = await TeamMember.countDocuments();
    const member = await TeamMember.create({
      ...body,
      order: body.order ?? count,
    });

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
