"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm font-semibold text-gray-900">
            Urban Move Logistics
          </p>
          <div className="flex gap-8">
            <Link
              href="#about"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              How It Works
            </Link>
            <Link
              href="#for-businesses"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              For Businesses
            </Link>
            <Link
              href="#for-riders"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              For Riders
            </Link>
            <Link
              href="#waitlist"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Urban Move Logistics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
