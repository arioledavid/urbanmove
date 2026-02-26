"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks referral link usage on page load.
 * When ?ref=xxx is in the URL, calls the API to increment referralsUsed for that referrer.
 * Uses a cookie to avoid counting the same visitor multiple times.
 */
export default function ReferralTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || tracked.current) return;

    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (!ref?.trim()) return;

    tracked.current = true;
    fetch(`/api/track-referral?ref=${encodeURIComponent(ref.trim())}`, {
      method: "GET",
      credentials: "include",
    }).catch(() => {
      tracked.current = false;
    });
  }, []);

  return null;
}
