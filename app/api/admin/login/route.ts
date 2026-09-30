import { NextResponse } from "next/server";
import { getAdminSecret, setAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { key } = await request.json();
    const validSecret = getAdminSecret();

    if (!key || key !== validSecret) {
      return NextResponse.json(
        { success: false, message: "Invalid admin authentication key." },
        { status: 401 }
      );
    }

    await setAdminSessionCookie(validSecret);

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Login failed." },
      { status: 500 }
    );
  }
}
