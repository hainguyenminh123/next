"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionRotateProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
}

export default function MotionRotate({
  children,
  duration = 100,
  reverse = false,
  ...props
}: MotionRotateProps) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
