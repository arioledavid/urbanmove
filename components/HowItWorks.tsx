"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Businesses Request Delivery",
    text: "Businesses submit delivery requests through Urban Move.",
    icon: "📦",
  },
  {
    title: "Smart Matching Engine",
    text: "Our system instantly matches the request with the nearest verified rider.",
    icon: "⚡",
  },
  {
    title: "Delivery Completed in Real-Time",
    text: "Customers receive their orders with full tracking visibility.",
    icon: "✓",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="text-center text-3xl font-bold text-gray-900 sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple. Intelligent. Reliable.
        </motion.h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#e0110c] text-2xl text-white">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                <span className="border-b-2 border-[#fcb900] pb-0.5">
                  {step.title}
                </span>
              </h3>
              <p className="mt-2 text-gray-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
