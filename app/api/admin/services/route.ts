import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

import fallbackServicesData from "@/data/services.json";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      const formatted = fallbackServicesData.services.map((s: any, i: number) => ({
        ...s,
        _id: s._id || s.id || `service-${i}`,
        serviceId: s.serviceId || s.id,
      }));
      return NextResponse.json({ success: true, services: formatted, isFallback: true });
    }

    const services = await Service.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, services });
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
        { success: false, error: "Database not connected. Please define MONGODB_URI in your .env.local file to add services." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const count = await Service.countDocuments();
    const service = await Service.create({
      ...body,
      order: body.order ?? count,
    });

    revalidatePath("/services");
    revalidatePath("/");

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
