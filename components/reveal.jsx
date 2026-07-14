'use client';
import { motion, useReducedMotion } from 'motion/react';
export function Reveal({ children, className = '', delay = 0 }) {
    const reduce = useReducedMotion();
    return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
