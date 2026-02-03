"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 10,
  x = 0,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once }}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
