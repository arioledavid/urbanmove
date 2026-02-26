/**
 * Debug API: GET /api/debug-env
 * Call this from the browser or curl to inspect env var loading.
 * Remove this route before deploying to production.
 */
import { NextResponse } from "next/server";
import { existsSync } from "fs";
import { join } from "path";

const FIREBASE_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

export async function GET() {
  const cwd = process.cwd();
  const envLocalPath = join(cwd, ".env.local");
  const envPath = join(cwd, ".env");
  const envDevelopmentPath = join(cwd, ".env.development");

  const status = FIREBASE_KEYS.map((key) => {
    const val = process.env[key];
    const present = val != null && String(val).trim() !== "";
    return {
      key,
      present,
      length: val ? String(val).length : 0,
      preview: present ? `${String(val).slice(0, 8)}...` : null,
    };
  });

  const payload = {
    timestamp: new Date().toISOString(),
    runtime: process.env.NEXT_RUNTIME ?? "unknown",
    nodeEnv: process.env.NODE_ENV,
    cwd,
    files: {
      ".env.local": existsSync(envLocalPath),
      ".env": existsSync(envPath),
      ".env.development": existsSync(envDevelopmentPath),
    },
    firebaseEnv: status,
    allPresent: status.every((s) => s.present),
  };

  return NextResponse.json(payload, { status: 200 });
}
