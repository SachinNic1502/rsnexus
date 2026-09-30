import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, inquiries: [], isFallback: true });
    }

    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
