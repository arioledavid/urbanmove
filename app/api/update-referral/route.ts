import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { randomBytes } from "crypto";

/**
 * Firestore rules must allow update on applications. Example:
 *   match /applications/{document} {
 *     allow create: if true;
 *     allow update: if true;  // needed for referral link
 *     allow read, delete: if false;
 *   }
 */

function generateReferralCode(): string {
  return randomBytes(4).toString("hex");
}

export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json(
      { error: "Firebase is not configured." },
      { status: 503 }
    );
  }

  try {
    const { docId } = await request.json();

    if (!docId) {
      return NextResponse.json(
        { error: "Missing docId." },
        { status: 400 }
      );
    }

    const applicationsRef = doc(db, "applications", docId);
    const snap = await getDoc(applicationsRef);

    let referralCode: string;
    if (snap.exists() && snap.data()?.referralCode) {
      referralCode = snap.data()!.referralCode;
    } else {
      referralCode = generateReferralCode();
      await updateDoc(applicationsRef, {
        referralCode,
        referralRequestedAt: serverTimestamp(),
        referralsUsed: 0,
      });
    }

    return NextResponse.json({ ok: true, referralCode }, { status: 200 });
  } catch (err) {
    console.error("Update referral failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
