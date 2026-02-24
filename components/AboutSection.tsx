"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-gray-50 px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          className="text-2xl font-bold text-gray-900 sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Pure logistics. No marketplace.
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Urban Move is a logistics aggregator. We connect businesses that need
          delivery to riders who deliver with a smart matching engine, real-time
          tracking, and one unified platform. We don&apos;t sell products; we
          move them.
        </motion.p>
      </div>
    </section>
  );
}
