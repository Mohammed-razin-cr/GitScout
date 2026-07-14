'use client';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { Code2, GitFork, Star } from 'lucide-react';
import { compactNumber } from '@/lib/github';
import { cn } from '@/lib/utils';

function rankTier(rating) {
    if (rating >= 98) return 'S+';
    if (rating >= 94) return 'S';
    if (rating >= 88) return 'A+';
    if (rating >= 82) return 'A';
    if (rating >= 74) return 'B';
    return 'C';
}

export function DeveloperCard({ developer, compact = false, exportRef }) {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-.5, .5], [8, -8]), { stiffness: 150, damping: 22 });
    const ry = useSpring(useTransform(x, [-.5, .5], [-8, 8]), { stiffness: 150, damping: 22 });
    const shineX = useTransform(x, [-.5, .5], ['10%', '90%']);
    const shineY = useTransform(y, [-.5, .5], ['10%', '90%']);
    const move = (event) => { if (event.pointerType !== 'mouse')
        return; const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left) / rect.width - .5); y.set((event.clientY - rect.top) / rect.height - .5); };
    const reset = () => { x.set(0); y.set(0); };
    return <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className={cn('w-full', compact ? 'max-w-[340px]' : 'max-w-[440px]')}>
    <motion.div ref={exportRef} onPointerMove={reduce ? undefined : move} onPointerLeave={reset} style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100, transformStyle: 'preserve-3d' }} className="group relative isolate overflow-hidden rounded-3xl border border-primary/35 bg-card p-2.5 shadow-[0_35px_100px_oklch(.04_.03_18/.75),0_0_55px_oklch(.67_.13_70/.12)]">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(145deg,oklch(.9_.08_85/.18),transparent_24%,transparent_72%,oklch(.57_.2_24/.16))]"/>
      <motion.div className="holographic pointer-events-none absolute inset-0 z-20 opacity-70 mix-blend-screen" style={reduce ? undefined : { backgroundPositionX: shineX, backgroundPositionY: shineY }}/>
      <div className="relative overflow-hidden rounded-[1.2rem] border border-primary/20 bg-secondary/95">
        <div className={cn('relative overflow-hidden p-5 sm:p-6', compact ? 'min-h-[290px] sm:min-h-[320px]' : 'min-h-[255px] sm:min-h-[290px]')}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,oklch(.72_.13_72/.2),transparent_28%),linear-gradient(145deg,oklch(.34_.15_22/.65),transparent_58%)]"/>
          <div className="relative flex items-start justify-between gap-4">
            <div className="relative z-10"><div className="mb-2 font-mono text-[10px] uppercase tracking-[.28em] text-primary">Rated out of 99</div><p className="gold-text font-heading text-7xl font-black leading-none tracking-[-.07em] sm:text-8xl">{developer.rating}</p><p className="mt-2 font-mono text-sm font-black uppercase tracking-[.22em] text-foreground">DEV</p><p className="mt-3 max-w-36 text-xs font-bold uppercase tracking-[.16em] text-foreground">{developer.role}</p></div>
            <div className="relative mt-5 shrink-0 rounded-full border border-primary/40 bg-background/50 p-1.5 shadow-[0_0_35px_oklch(.72_.13_72/.22)]"><Image src={developer.avatar} alt={`${developer.name} avatar`} width={compact ? 108 : 140} height={compact ? 108 : 140} className={cn('rounded-full object-cover', compact ? 'size-24 sm:size-28' : 'size-28 sm:size-36')} priority unoptimized crossOrigin="anonymous"/><span aria-label={`${rankTier(developer.rating)} rank`} className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-[10px] font-black tracking-tight text-primary">{rankTier(developer.rating)}</span></div>
          </div>
          <div className="absolute inset-x-5 bottom-5"><p className={cn('font-heading font-extrabold leading-[.95] tracking-tight', compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl')}>{developer.name}</p><div className="mt-1 flex items-center justify-between gap-3"><p className="min-w-0 truncate font-mono text-xs text-primary/80">@{developer.login}</p><p className="shrink-0 rounded-full border border-primary/25 bg-background/45 px-3 py-1 font-mono text-[9px] uppercase tracking-[.2em] text-primary backdrop-blur">GC · 2026</p></div></div>
        </div>
        <div className="border-t border-primary/20 bg-background/55 p-4 backdrop-blur-xl sm:p-5">
          <div className="grid grid-cols-3 gap-2"><Stat icon={Star} value={compactNumber(developer.stars)} label="Stars"/><Stat icon={GitFork} value={compactNumber(developer.forks)} label="Forks"/><Stat icon={Code2} value={developer.languages[0]?.name || 'Code'} label="Core"/></div>
          {!compact && <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">{developer.attributes.map((item) => <div key={item.label}><div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><span>{item.label}</span><span className="text-primary">{item.value}</span></div><div className="h-1 overflow-hidden rounded-full bg-muted"><motion.div initial={reduce ? false : { width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: .8 }} className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--primary))]"/></div></div>)}</div>}
        </div>
      </div>
    </motion.div>
  </motion.div>;
}
function Stat({ icon: Icon, value, label }) { return <div className="rounded-2xl border border-primary/10 bg-card/55 p-2.5 text-center"><Icon className="mx-auto mb-1.5 size-4 text-primary"/><p className="truncate text-xs font-bold sm:text-sm">{value}</p><p className="text-[9px] uppercase tracking-[.16em] text-muted-foreground">{label}</p></div>; }
