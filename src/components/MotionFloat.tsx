"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionFloatProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  duration?: number;
  x?: number[];
  y?: number[];
  scale?: number[];
  rotate?: number[];
  opacity?: number[];
  delay?: number;
}

export default function MotionFloat({
  children,
  duration = 15,
  x = [0, 50, 0],
  y = [0, -30, 0],
  scale = [1, 1.1, 1],
  rotate = [0, 5, 0],
  opacity,
  delay = 0,
  ...props
}: MotionFloatProps) {
  return (
    <motion.div
      animate={{
        x,
        y,
        scale,
        rotate,
        opacity,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
