"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
          <Link
            href="/"
            className="flex shrink-0 items-center overflow-visible"
            aria-label="Urban Move Logistics home"
          >
            <img
              src="/logo.svg"
              alt="Urban Move Logistics"
              className="h-9 w-auto origin-left scale-[2.2] object-contain object-left sm:scale-[2.5] lg:scale-[2.7]"
              width={560}
              height={192}
            />
          </Link>
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
              href="#join"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Join the Movement
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Urban Move Logistics. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
