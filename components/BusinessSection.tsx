"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FeatureCard from "./FeatureCard";

const businessFeatures = [
  {
    title: "On-Demand Delivery",
    description: "Dispatch deliveries instantly when customers place orders.",
  },
  {
    title: "Bulk & Scheduled Dispatch",
    description: "Schedule and automate your daily delivery operations.",
  },
  {
    title: "Real-Time Tracking Dashboard",
    description: "Monitor every delivery in real-time with full visibility.",
  },
  {
    title: "Multi-Location Support",
    description: "Manage multiple branches under one unified system.",
  },
  {
    title: "Smart Dispatch Matching",
    description: "Our system intelligently assigns the best available rider.",
  },
];

export default function BusinessSection() {
  return (
    <section
      id="for-businesses"
      className="bg-white px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="text-center text-3xl font-bold text-gray-900 sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built for Businesses That Need Reliable Delivery.
        </motion.h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessFeatures.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="#join">
            <motion.span
              className="inline-flex items-center rounded-xl bg-[#e0110c] px-8 py-3.5 text-base font-semibold text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Join as a Business
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
