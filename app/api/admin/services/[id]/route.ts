import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models";
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
    const body = await request.json();

    await connectDB();
    const service = await Service.findByIdAndUpdate(id, body, { new: true });

    revalidatePath("/services");
    revalidatePath("/");

    return NextResponse.json({ success: true, service });
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
    await Service.findByIdAndDelete(id);

    revalidatePath("/services");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Service deleted." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
