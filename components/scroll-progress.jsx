'use client';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: .001 });
    return <motion.div aria-hidden="true" className="scroll-progress" style={reduce ? undefined : { scaleX }}/>
}
