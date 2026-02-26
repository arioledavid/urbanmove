/**
 * Firebase configuration for Next.js App Router
 * Uses Firebase v9 modular SDK
 *
 * Make sure all NEXT_PUBLIC_FIREBASE_* variables are added to Render Environment settings.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

function hasValidEnv(): boolean {
  return requiredEnvVars.every(
    (key) => process.env[key] && String(process.env[key]).trim() !== ""
  );
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (getApps().length === 0 && hasValidEnv()) {
  app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  });
  db = getFirestore(app);
} else if (getApps().length > 0) {
  const existingApp = getApps()[0] as FirebaseApp;
  app = existingApp;
  db = getFirestore(app);
}

export { db };
