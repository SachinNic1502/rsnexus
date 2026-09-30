import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobOpening } from "@/models";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const updates = await request.json();

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database not connected. Configure MONGODB_URI to modify jobs." },
        { status: 503 }
      );
    }
    const job = await JobOpening.findByIdAndUpdate(id, updates, { new: true });

    revalidatePath("/careers");
    if (job?.slug) {
      revalidatePath(`/careers/${job.slug}`);
    }

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    await JobOpening.findByIdAndDelete(id);

    revalidatePath("/careers");

    return NextResponse.json({ success: true, message: "Job opening deleted." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
