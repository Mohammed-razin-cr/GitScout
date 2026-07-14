'use client';
import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
export function AnimatedCounter({ value, suffix = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const reduce = useReducedMotion();
    const count = useMotionValue(reduce ? value : 0);
    const rounded = useTransform(count, (latest) => `${Math.round(latest).toLocaleString()}${suffix}`);
    useEffect(() => { if (!inView || reduce)
        return; const controls = animate(count, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] }); return controls.stop; }, [count, inView, reduce, value]);
    return <motion.span ref={ref}>{rounded}</motion.span>;
}
