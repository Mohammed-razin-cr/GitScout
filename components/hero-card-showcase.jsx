'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Radar, ShieldCheck } from 'lucide-react';
import { DeveloperCard } from '@/components/developer-card';

export function HeroCardShowcase({ developer }) {
    const reduce = useReducedMotion();
    return <div className="hero-card-showcase">
    <motion.span aria-hidden="true" className="hero-orbit hero-orbit-large" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}/>
    <motion.span aria-hidden="true" className="hero-orbit hero-orbit-small" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}/>
    <motion.div className="hero-status hero-status-top" initial={reduce ? false : { opacity: 0, x: 16 }} animate={reduce ? undefined : { opacity: 1, x: 0 }} transition={{ delay: .35 }}>
      <motion.span aria-hidden="true" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}><Radar className="size-3.5"/></motion.span>
      Live profile scan
    </motion.div>
    <motion.div className="hero-status hero-status-bottom" initial={reduce ? false : { opacity: 0, x: -16 }} animate={reduce ? undefined : { opacity: 1, x: 0 }} transition={{ delay: .5 }}>
      <ShieldCheck className="size-3.5"/>
      Public data only
    </motion.div>
    <motion.div whileHover={reduce ? undefined : { y: -5, scale: 1.012 }} transition={{ type: 'spring', stiffness: 230, damping: 22 }} className="relative z-10">
      <div className="card-stage"><DeveloperCard developer={developer}/></div>
    </motion.div>
  </div>;
}
