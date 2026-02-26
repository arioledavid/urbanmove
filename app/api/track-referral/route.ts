import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const REFERRAL_COOKIE = "urban_ref_tracked";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function GET(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref || typeof ref !== "string" || ref.length > 50) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const tracked = request.cookies.get(REFERRAL_COOKIE)?.value;
  if (tracked?.includes(ref)) {
    return NextResponse.json({ ok: true, skipped: "already_tracked" });
  }

  try {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("referralCode", "==", ref.trim()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }

    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, { referralsUsed: increment(1) });

    const res = NextResponse.json({ ok: true });
    const existing = tracked ? `${tracked},` : "";
    res.cookies.set(REFERRAL_COOKIE, `${existing}${ref}`, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
    return res;
  } catch (err) {
    console.error("Track referral failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
