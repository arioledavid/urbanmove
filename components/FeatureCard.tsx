"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  index?: number;
}

export default function FeatureCard({
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      className="rounded-2xl border-t-4 border-[#e0110c] bg-white p-6 shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08)" }}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
  );
}
