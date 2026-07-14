'use client';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Brain, Crown, Heart, Shield, Sparkles, WandSparkles } from 'lucide-react';
import { initials, universeMeta } from '@/lib/characters';
import { cn } from '@/lib/utils';
export function CharacterCard({ match, compact = false, exportRef }) {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-.5, .5], [8, -8]), { stiffness: 150, damping: 22 });
    const ry = useSpring(useTransform(x, [-.5, .5], [-8, 8]), { stiffness: 150, damping: 22 });
    const shineX = useTransform(x, [-.5, .5], ['10%', '90%']);
    const shineY = useTransform(y, [-.5, .5], ['10%', '90%']);
    const move = (event) => { if (event.pointerType !== 'mouse')
        return; const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left) / rect.width - .5); y.set((event.clientY - rect.top) / rect.height - .5); };
    return <motion.div animate={reduce ? undefined : { y: [0, -9, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className={cn('w-full', compact ? 'max-w-[340px]' : 'max-w-[440px]')}>
    <motion.div ref={exportRef} onPointerMove={reduce ? undefined : move} onPointerLeave={() => { x.set(0); y.set(0); }} style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100, transformStyle: 'preserve-3d' }} className="group relative isolate overflow-hidden rounded-3xl border border-primary/35 bg-card p-2.5 shadow-[0_35px_100px_oklch(.04_.03_18/.75),0_0_55px_oklch(.67_.13_70/.12)]">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(145deg,oklch(.9_.08_85/.18),transparent_24%,transparent_72%,oklch(.57_.2_24/.16))]"/><motion.div className="holographic pointer-events-none absolute inset-0 z-20 opacity-70 mix-blend-screen" style={reduce ? undefined : { backgroundPositionX: shineX, backgroundPositionY: shineY }}/>
      <div className="relative overflow-hidden rounded-[1.2rem] border border-primary/20 bg-secondary/95">
        <div className="relative min-h-[300px] overflow-hidden p-5 sm:min-h-[340px] sm:p-6"><div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,oklch(.72_.13_72/.22),transparent_30%),linear-gradient(145deg,oklch(.34_.15_22/.68),transparent_60%)]"/><div className="absolute -right-12 top-16 size-56 rounded-full border border-primary/10"/>
          <div className="relative flex items-start justify-between gap-4"><div className="relative z-10"><div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.28em] text-primary"><Crown className="size-3"/> Soul match</div><p className="gold-text font-heading text-6xl font-black leading-none tracking-[-.07em] sm:text-8xl">{match.matchPercentage}<span className="text-2xl">%</span></p><p className="mt-3 max-w-40 text-xs font-bold uppercase tracking-[.18em] text-foreground">{match.archetype}</p></div>
            <div className="relative mt-4 flex size-28 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background/45 shadow-[0_0_35px_oklch(.72_.13_72/.22)] sm:size-36"><span className="gold-text font-heading text-5xl font-black sm:text-6xl">{initials(match.characterName)}</span><span className="absolute -bottom-1 -right-1 flex size-9 items-center justify-center rounded-full border border-primary/40 bg-background text-primary"><WandSparkles className="size-4"/></span></div></div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3"><div className="min-w-0"><p className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">{match.characterName}</p><p className="font-mono text-xs text-primary/80">{match.universe}</p></div><p className="shrink-0 rounded-full border border-primary/25 bg-background/45 px-3 py-1 font-mono text-[9px] uppercase tracking-[.2em] text-primary backdrop-blur">CF · 2026</p></div>
        </div>
        <div className="border-t border-primary/20 bg-background/55 p-4 backdrop-blur-xl sm:p-5"><div className="grid grid-cols-3 gap-2"><Stat icon={Shield} value={match.characterTraits.courage} label="Courage"/><Stat icon={Brain} value={match.characterTraits.intelligence} label="Intellect"/><Stat icon={Heart} value={match.characterTraits.empathy} label="Empathy"/></div>{!compact && <div className="mt-5 flex items-center justify-between gap-3 border-t border-primary/10 pt-4"><p className="line-clamp-2 text-xs italic leading-relaxed text-muted-foreground">“{match.quote}”</p><span className="shrink-0 rounded-full p-2" style={{ color: universeMeta[match.universe].color }}><Sparkles className="size-4"/></span></div>}</div>
      </div>
    </motion.div>
  </motion.div>;
}
function Stat({ icon: Icon, value, label }) { return <div className="rounded-2xl border border-primary/10 bg-card/55 p-2.5 text-center"><Icon className="mx-auto mb-1.5 size-4 text-primary"/><p className="text-sm font-bold">{value}</p><p className="text-[9px] uppercase tracking-[.14em] text-muted-foreground">{label}</p></div>; }
