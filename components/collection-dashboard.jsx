'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Heart, Search, Sparkles, Trash2, WandSparkles } from 'lucide-react';
import { CharacterCard } from '@/components/character-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { clearMatches, getMatches, removeMatch, toggleFavorite } from '@/lib/collection';
import { formatDate, universes } from '@/lib/characters';
export function CollectionDashboard() {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');
    const [universe, setUniverse] = useState('All');
    const [favorites, setFavorites] = useState(false);
    useEffect(() => { const refresh = () => setItems(getMatches()); refresh(); window.addEventListener('characterforge:updated', refresh); return () => window.removeEventListener('characterforge:updated', refresh); }, []);
    const filtered = useMemo(() => items.filter((item) => (!favorites || item.favorite) && (universe === 'All' || item.universe === universe) && item.characterName.toLowerCase().includes(query.toLowerCase())), [items, query, universe, favorites]);
    return <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-4"><Heart className="size-3"/> Personal archive</p><h1 className="font-heading text-5xl font-black tracking-tight sm:text-6xl">Your character <span className="gold-text">collection.</span></h1><p className="mt-4 text-muted-foreground">Every match is stored privately in this browser.</p></div>{items.length > 0 && <Button variant="outline" onClick={() => { clearMatches(); setItems([]); }}><Trash2 data-icon="inline-start"/>Clear history</Button>}</div>
    <div className="glass-panel mb-8 flex flex-col gap-3 p-4 sm:flex-row"><div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search characters" className="h-11 rounded-xl pl-10"/></div><select value={universe} onChange={(event) => setUniverse(event.target.value)} className="h-11 rounded-xl border border-input bg-background/50 px-3 text-sm outline-none"><option>All</option>{universes.map((item) => <option key={item}>{item}</option>)}</select><Button variant={favorites ? 'default' : 'outline'} onClick={() => setFavorites(!favorites)} className="h-11"><Heart data-icon="inline-start"/>Favorites</Button></div>
    {filtered.length === 0 ? <div className="glass-panel flex min-h-80 flex-col items-center justify-center p-8 text-center"><span className="brand-mark mb-5"><WandSparkles /></span><h2 className="font-heading text-2xl font-bold">{items.length ? 'No matches found' : 'Your collection is empty'}</h2><p className="mt-3 max-w-md text-muted-foreground">{items.length ? 'Try changing your search or filters.' : 'Generate a character match from a profile page to start saving cards.'}</p><Button nativeButton={false} render={<Link href="/player/Mohammed-razin-cr#character-match"/>} className="premium-button mt-6"><Sparkles data-icon="inline-start"/>Create a match</Button></div> : <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <article key={item.id} className="flex flex-col items-center gap-4"><CharacterCard match={item} compact/><div className="glass-panel-subtle flex w-full max-w-[340px] items-center justify-between gap-3 p-3"><div className="min-w-0"><p className="truncate text-sm font-semibold">{item.characterName}</p><p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p></div><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label="Favorite match" onClick={() => setItems(toggleFavorite(item.id))}><Heart className={item.favorite ? 'fill-current text-primary' : ''}/></Button><Button variant="ghost" size="icon" aria-label="Remove match" onClick={() => setItems(removeMatch(item.id))}><Trash2 /></Button></div></div></article>)}</div>}
  </main>;
}
