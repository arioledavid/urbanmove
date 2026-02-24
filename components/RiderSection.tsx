"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const riderBullets = [
  "Work full-time or part-time",
  "Flexible vehicle options",
  "Instant delivery matching",
  "Transparent earnings",
  "Performance bonuses",
];

export default function RiderSection() {
  return (
    <section
      id="for-riders"
      className="bg-gray-200 px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Earn on Your Terms.
            </h2>
            <ul className="mt-8 space-y-4">
              {riderBullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  className="flex items-center gap-3 text-lg text-gray-700"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#e0110c]" />
                  {bullet}
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3">
              <Link href="#join">
                <motion.span
                  className="inline-flex items-center rounded-xl bg-[#e0110c] px-8 py-3.5 text-base font-semibold text-white"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join as a Rider
                </motion.span>
              </Link>
            </div>
          </motion.div>
          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
