"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

const DeliveryCardMap = dynamic(() => import("@/components/DeliveryCardMap"), {
  ssr: false,
  loading: () => (
    <div className="h-32 lg:h-56 rounded-lg bg-gray-100 flex items-center justify-center">
      <span className="text-sm text-gray-400">Loading map…</span>
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
              Powering Local Deliveries at{" "}
              <span className="relative inline-block">
                Scale.
                <span
                  className="absolute bottom-1 left-0 h-1 w-full rounded-full bg-[#fcb900]"
                  aria-hidden
                />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600 lg:text-xl">
              Urban Move connects businesses to customers through a smart,
              reliable logistics network. No marketplace. No middlemen. Just
              movement.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#join">
                <motion.span
                  className="inline-flex items-center rounded-xl bg-[#e0110c] px-6 py-3.5 text-base font-semibold text-white"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join as a Business
                </motion.span>
              </Link>
              <Link href="#join">
                <motion.span
                  className="inline-flex items-center rounded-xl border-2 border-[#e0110c] px-6 py-3.5 text-base font-semibold text-[#e0110c] transition hover:bg-[#e0110c]/5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join as a Rider
                </motion.span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Delivery #UM-2847
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  In progress
                </span>
              </div>
              <DeliveryCardMap />
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>Pickup: 12 min</span>
                <span>Drop-off: ~25 min</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
