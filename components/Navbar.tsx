"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#for-businesses", label: "For Businesses" },
  { href: "#for-riders", label: "For Riders" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0 1px 0 rgba(0,0,0,0)", "0 4px 6px -1px rgba(0,0,0,0.08)"],
  );

  if (!mounted) return null;

  return (
    <motion.header
      className="sticky top-0 z-50 overflow-visible bg-white"
      style={{ boxShadow: shadow }}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex h-full shrink-0 items-center overflow-visible"
          aria-label="Urban Move Logistics home"
        >
          <img
            src="/logo.svg"
            alt="Urban Move Logistics"
            className="h-9 w-auto translate-y-3 origin-center scale-[3.2] object-contain sm:scale-[3.6] lg:scale-[4]"
            width={560}
            height={192}
          />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#join">
            <motion.span
              className="inline-flex items-center rounded-xl bg-[#e0110c] px-5 py-2.5 text-sm font-semibold text-white"
              whileHover={{ scale: 1.03, backgroundColor: "#c00f0a" }}
              whileTap={{ scale: 0.98 }}
            >
              Join the Movement
            </motion.span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
