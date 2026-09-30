import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

import fallbackFaq from "@/data/faq.json";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      const formatted = fallbackFaq.map((f: any, i: number) => ({
        ...f,
        _id: f._id || `faq-${i}`,
      }));
      return NextResponse.json({ success: true, faqs: formatted, isFallback: true });
    }

    const faqs = await Faq.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, faqs });
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
        { success: false, error: "Database not connected. Please define MONGODB_URI in your .env.local file to add FAQs." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const count = await Faq.countDocuments();
    const faq = await Faq.create({
      ...body,
      order: body.order ?? count,
    });

    revalidatePath("/faq");
    revalidatePath("/contact");

    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
