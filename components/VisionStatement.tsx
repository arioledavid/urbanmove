"use client";

import { motion } from "framer-motion";

export default function VisionStatement() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="text-xl font-medium text-gray-700 sm:text-2xl leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          We&apos;re building the logistics backbone for local commerce so
          businesses can focus on what they do best, and customers get their
          orders when they need them.
        </motion.p>
      </div>
    </section>
  );
}
