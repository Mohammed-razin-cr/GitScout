'use client';
import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { motion } from 'motion/react';
import { Check, Download, Heart, RotateCcw, Share2, Sparkles, WandSparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CharacterCard } from '@/components/character-card';
import { TraitChart } from '@/components/trait-chart';
import { defaultTraits, demoMatch, traitKeys, traitLabels, universes, universeMeta } from '@/lib/characters';
import { saveMatch, toggleFavorite } from '@/lib/collection';
import { cn } from '@/lib/utils';
export function CharacterForge() {
    const [universe, setUniverse] = useState('Marvel');
    const [traits, setTraits] = useState(defaultTraits);
    const [match, setMatch] = useState(null);
    const [savedId, setSavedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const cardRef = useRef(null);
    const forge = async () => { setLoading(true); setMatch(null); setSavedId(null); setFavorite(false); try {
        const response = await fetch('/api/match', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ universe, traits }) });
        const data = await response.json();
        if (!response.ok)
            throw new Error(data.error);
        setMatch(data);
        setSavedId(saveMatch(data, traits).id);
        toast.success('Character match saved');
    }
    catch (error) {
        toast.error(error instanceof Error ? error.message : 'The match could not be created.');
    }
    finally {
        setLoading(false);
    } };
    const download = async () => { if (!cardRef.current || !match)
        return; const url = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 }); const link = document.createElement('a'); link.download = `characterforge-${match.characterName.toLowerCase().replaceAll(' ', '-')}.png`; link.href = url; link.click(); };
    const share = async () => { if (!match)
        return; const text = `I matched ${match.matchPercentage}% with ${match.characterName} on GitScout.`; if (navigator.share)
        await navigator.share({ title: 'My GitScout character match', text, url: location.origin });
    else {
        await navigator.clipboard.writeText(`${text} ${location.origin}`);
        toast.success('Match copied to clipboard');
    } };
    return <>
    <section className="relative overflow-hidden px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8"><div className="spotlight -left-48 top-10 size-[500px]"/><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative"><p className="eyebrow mb-5"><WandSparkles className="size-3"/> Character matching</p><h1 className="text-balance font-heading text-5xl font-black leading-[.93] tracking-[-.055em] sm:text-7xl xl:text-[5.8rem]">Find a fictional match for your developer style.</h1><p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">Set six traits, choose a universe, and generate a character card you can save or share.</p>
        <div className="glass-panel mt-9 p-5 sm:p-7"><p className="mb-5 font-mono text-xs uppercase tracking-[.2em] text-primary">Choose your universe</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{universes.map((item) => <button key={item} onClick={() => setUniverse(item)} className={cn('rounded-2xl border px-3 py-3 text-left transition-all', universe === item ? 'border-primary bg-primary/12 text-foreground shadow-[0_0_22px_oklch(.72_.13_72/.12)]' : 'border-border/60 bg-background/35 text-muted-foreground hover:border-primary/30 hover:text-foreground')}><span className="mb-2 block font-mono text-[9px] uppercase tracking-[.18em]" style={{ color: universeMeta[item].color }}>{universeMeta[item].short}</span><span className="text-sm font-semibold">{item}</span></button>)}</div>
          <div className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">{traitKeys.map((key) => <label key={key} className="block"><span className="mb-2 flex justify-between text-sm font-medium"><span>{traitLabels[key]}</span><span className="font-mono text-xs text-primary">{traits[key]}</span></span><Slider min={0} max={100} step={1} value={[traits[key]]} onValueChange={(value) => setTraits((current) => ({ ...current, [key]: Array.isArray(value) ? value[0] : value }))} aria-label={traitLabels[key]}/></label>)}</div>
          <Button size="lg" onClick={forge} disabled={loading} className="premium-button mt-8 h-12 w-full rounded-xl px-6 text-sm font-bold"><Sparkles data-icon="inline-start"/>{loading ? 'Finding a match...' : 'Reveal my character'}</Button>
        </div>
      </motion.div>
      <div className="card-stage">{loading ? <ForgeSkeleton /> : <CharacterCard match={match || demoMatch} exportRef={match ? cardRef : undefined}/>}</div>
    </div></section>
    {match && <motion.section initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="border-y border-primary/10 bg-card/15 px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-4"><Check className="size-3"/> Match complete</p><h2 className="font-heading text-4xl font-black tracking-tight sm:text-5xl">Why {match.characterName}?</h2></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => { if (savedId)
            toggleFavorite(savedId); setFavorite(!favorite); }}><Heart data-icon="inline-start" className={favorite ? 'fill-current text-primary' : ''}/>{favorite ? 'Liked' : 'Like'}</Button><Button variant="outline" onClick={share}><Share2 data-icon="inline-start"/>Share</Button><Button onClick={download}><Download data-icon="inline-start"/>Download card</Button></div></div>
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]"><article className="glass-panel p-6 sm:p-8"><p className="text-pretty text-lg leading-relaxed text-muted-foreground">{match.explanation}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div><p className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-primary">Signature strengths</p><div className="flex flex-wrap gap-2">{match.strengths.map((item) => <span key={item} className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-sm">{item}</span>)}</div></div><div><p className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-primary">Growth edge</p><p className="text-sm leading-relaxed text-muted-foreground">{match.growthAreas.join(' · ')}</p></div></div></article><div className="glass-panel p-4 sm:p-6"><p className="px-2 pt-2 font-mono text-[10px] uppercase tracking-[.2em] text-primary">Trait alignment</p><TraitChart user={traits} character={match.characterTraits}/></div></div>
      <div className="glass-panel mt-6 p-6 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">Similar matches</p><div className="mt-3 flex flex-wrap gap-2">{match.similarCharacters.map((item) => <span key={item} className="rounded-full border border-border bg-background/45 px-4 py-2 text-sm">{item}</span>)}</div></div><Button variant="outline" onClick={() => { setMatch(null); scrollTo({ top: 0, behavior: 'smooth' }); }}><RotateCcw data-icon="inline-start"/>Try again</Button></div></div>
    </div></motion.section>}
  </>;
}
function ForgeSkeleton() { return <div className="glass-panel flex min-h-[570px] w-full max-w-[440px] animate-pulse flex-col p-3"><div className="flex-1 rounded-[1.2rem] bg-muted/60"/><div className="mt-3 grid grid-cols-3 gap-2">{[1, 2, 3].map((item) => <div key={item} className="h-20 rounded-2xl bg-muted/50"/>)}</div></div>; }
