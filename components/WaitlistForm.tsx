"use client";

import { motion } from "framer-motion";
import MultiStepForm from "./MultiStepForm";

export default function WaitlistForm() {
  return (
    <section id="join" className="bg-[#e0110c] px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          className="text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join the Movement.
        </motion.h2>
        <div className="mt-12">
          <MultiStepForm />
        </div>
      </div>
    </section>
  );
}
