'use client';
import { motion, useReducedMotion } from 'motion/react';
import { DeveloperCard } from '@/components/developer-card';

export function HeroCardShowcase({ developer }) {
    const reduce = useReducedMotion();
    return <div className="hero-card-showcase">
    <motion.span aria-hidden="true" className="hero-orbit hero-orbit-large" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}/>
    <motion.span aria-hidden="true" className="hero-orbit hero-orbit-small" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}/>
    <motion.div whileHover={reduce ? undefined : { y: -5, scale: 1.012 }} transition={{ type: 'spring', stiffness: 230, damping: 22 }} className="relative z-10">
      <div className="card-stage"><DeveloperCard developer={developer}/></div>
    </motion.div>
  </div>;
}
