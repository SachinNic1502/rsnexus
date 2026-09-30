import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TeamMember } from "@/models";
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
    const member = await TeamMember.findByIdAndUpdate(id, body, { new: true });

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, member });
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
    await TeamMember.findByIdAndDelete(id);

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Team member deleted." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
