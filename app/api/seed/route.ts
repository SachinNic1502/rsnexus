import { NextResponse } from "next/server";
import { runDatabaseSeed } from "@/lib/seed-data";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    const isAuth = await isAuthenticatedAdmin();
    const isSecretValid = process.env.SEED_SECRET && secret === process.env.SEED_SECRET;

    // Allow execution if caller is an authenticated admin OR provided a valid SEED_SECRET
    if (!isAuth && !isSecretValid) {
      if (process.env.SEED_SECRET) {
        return NextResponse.json(
          { error: "Unauthorized. Provide valid ?secret= query parameter or authenticate as admin." },
          { status: 401 }
        );
      }
    }

    const results = await runDatabaseSeed();

    return NextResponse.json({
      success: true,
      message: "MongoDB successfully populated with existing data and career openings!",
      seededCounts: results,
    });
  } catch (error: any) {
    console.error("Database seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An error occurred during database seeding.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
