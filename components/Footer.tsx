"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center overflow-visible md:justify-start"
            aria-label="Urban Move Logistics home"
          >
            <img
              src="/logo.svg"
              alt="Urban Move Logistics"
              className="h-9 w-auto origin-center object-center scale-[3.2] object-contain md:origin-left md:object-left sm:scale-[3.6] lg:scale-[4]"
              width={560}
              height={192}
            />
          </Link>
          <nav className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 md:gap-8 md:justify-start">
            <Link
              href="#about"
              className="whitespace-nowrap text-sm text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="#how-it-works"
              className="whitespace-nowrap text-sm text-gray-500 hover:text-gray-900"
            >
              How It Works
            </Link>
            <Link
              href="#for-businesses"
              className="whitespace-nowrap text-sm text-gray-500 hover:text-gray-900"
            >
              For Businesses
            </Link>
            <Link
              href="#for-riders"
              className="whitespace-nowrap text-sm text-gray-500 hover:text-gray-900"
            >
              For Riders
            </Link>
            <Link
              href="#join"
              className="whitespace-nowrap text-sm text-gray-500 hover:text-gray-900"
            >
              Join the Movement
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Urban Move Logistics. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
