"use client";

import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MotionViewportProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  initialY?: number;
  initialScale?: number;
  useOpacity?: boolean;
  useScale?: boolean;
  useY?: boolean;
}

export default function MotionViewport({
  children,
  initialY = 50,
  initialScale = 0.95,
  useOpacity = true,
  useScale = false,
  useY = true,
  className,
  ...props
}: MotionViewportProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [initialY, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [initialScale, 1]);

  const style: any = {};
  if (useOpacity) style.opacity = opacity;
  if (useY) style.y = y;
  if (useScale) style.scale = scale;

  return (
    <motion.section
      ref={ref}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
