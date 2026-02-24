"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 75, damping: 15 });
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsub = springValue.on("change", (v) =>
      setDisplayValue(Math.round(v)),
    );
    return () => unsub();
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function SocialProof() {
  return (
    <motion.section
      className="bg-[#fffbeb] py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <p className="text-center text-base font-medium text-gray-700 sm:text-lg">
        Already <AnimatedNumber value={124} /> businesses and{" "}
        <AnimatedNumber value={86} /> riders have joined the movement.
      </p>
    </motion.section>
  );
}
