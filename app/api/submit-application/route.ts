import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json(
      { error: "Firebase is not configured." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const {
      type,
      fullName,
      email,
      phone,
      city = "",
      businessName,
      businessType,
      weeklyDeliveries,
      biggestChallenge,
      offersDelivery,
      vehicleType,
      deliveryExperience,
      preferredHours,
      expectedEarnings,
    } = body;

    const docData = {
      type: type ?? "business",
      fullName: String(fullName ?? "").trim(),
      email: String(email ?? "").trim(),
      phone: String(phone ?? "").trim(),
      city: String(city ?? "").trim(),
      status: "new" as const,
      createdAt: serverTimestamp(),
      businessName: businessName?.trim() || null,
      businessType: businessType || null,
      weeklyDeliveries: weeklyDeliveries || null,
      deliveryChallenge: biggestChallenge?.trim() || null,
      offersDelivery:
        offersDelivery === "yes"
          ? true
          : offersDelivery === "no"
            ? false
            : null,
      vehicleType: vehicleType || null,
      experience:
        deliveryExperience === "yes"
          ? true
          : deliveryExperience === "no"
            ? false
            : null,
      preferredHours: preferredHours?.trim() || null,
      expectedEarnings: expectedEarnings || null,
    };

    const applicationsRef = collection(db, "applications");
    const docRef = await addDoc(applicationsRef, docData);

    return NextResponse.json({ ok: true, docId: docRef.id }, { status: 200 });
  } catch (err) {
    console.error("Submit application failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
