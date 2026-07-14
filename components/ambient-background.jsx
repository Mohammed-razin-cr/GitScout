'use client';
import { motion, useReducedMotion } from 'motion/react';
const particles = [
    ['8%', '18%', 3, 0], ['18%', '72%', 2, 1.2], ['29%', '34%', 4, .4], ['41%', '82%', 2, 1.8],
    ['53%', '20%', 3, .9], ['66%', '64%', 2, 2.1], ['78%', '30%', 4, 1.4], ['91%', '76%', 2, .6],
];
export function AmbientBackground() {
    const reduce = useReducedMotion();
    return <div className="ambient pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
    <div className="ambient-spotlight ambient-spotlight-left"/>
    <div className="ambient-spotlight ambient-spotlight-right"/>
    <div className="ambient-vignette"/>
    {particles.map(([left, top, size, delay], index) => <motion.span key={index} className="ambient-particle" style={{ left, top, width: size, height: size }} animate={reduce ? undefined : { y: [0, -18, 0], opacity: [.18, .7, .18] }} transition={{ duration: 5 + index * .45, repeat: Infinity, delay: Number(delay), ease: 'easeInOut' }}/>)}
  </div>;
}
