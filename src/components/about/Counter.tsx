"use client";

import {animate, motion, useInView, useMotionValue, useTransform} from 'framer-motion';
import {useEffect, useRef} from 'react';

interface CounterProps {
	value: string;
	duration?: number;
}

export default function Counter({value, duration = 2}: CounterProps) {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, {once: true});
	
	const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
	const suffix = value.replace(/[0-9]/g, '');
	
	useEffect(() => {
		if (isInView) {
			const controls = animate(count, numericValue, {duration});
			return controls.stop;
		}
	}, [isInView, numericValue, count, duration]);
	
	return (
			<span ref={ref}>
      <motion.span>{rounded}</motion.span>
				{suffix}
    </span>
	);
}
