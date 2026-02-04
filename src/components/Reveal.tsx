"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  width?: string;
  as?: any;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 10,
  x = 0,
  scale = 1,
  width,
  as: Component = motion.div,
  once = true,
  ...props
}: RevealProps) {
  return (
    <Component
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once }}
      transition={{ delay, duration }}
      style={{ width, ...props.style }}
      {...props}
    >
      {children}
    </Component>
  );
}
