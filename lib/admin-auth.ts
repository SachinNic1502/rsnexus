import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "rsnexus_admin_auth";
const DEFAULT_SECRET = "rsnexus-admin-2026";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET_KEY || DEFAULT_SECRET;
}

export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return token === getAdminSecret();
}
