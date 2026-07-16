'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award, Database, Search, SlidersHorizontal, Sparkles, Trophy, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const scannedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
const podiumOrder = [1, 0, 2];
const podiumMeta = [
    { label: 'Second', mark: '2', className: 'md:mt-10' },
    { label: 'First', mark: '1', className: 'md:-mt-2' },
    { label: 'Third', mark: '3', className: 'md:mt-16' },
];

function FilterSelect({ label, value, onChange, options }) {
    return <label className="flex min-w-0 flex-col gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 rounded-xl border border-input bg-background/50 px-3 text-sm font-medium normal-case tracking-normal text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function PodiumCard({ developer, position, className }) {
    const reduce = useReducedMotion();
    const meta = podiumMeta[position];
    return <motion.article initial={reduce ? false : { opacity: 0, y: 28 }} animate={reduce ? undefined : { opacity: 0 + 1, y: 0 }} transition={{ delay: position * 0.1 }} whileHover={reduce ? undefined : { y: -8 }} className={cn('glass-panel relative flex flex-col items-center overflow-hidden p-5 text-center', className)}>
      <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-primary/10 blur-3xl"/>
      <span className="relative mb-3 flex size-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 font-heading text-lg font-black text-primary">{meta.mark}</span>
      <Avatar className="relative size-20 ring-4 ring-primary/15"><AvatarImage src={developer.avatar} alt={`${developer.name}'s profile`}/><AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback></Avatar>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-primary">{meta.label} place</p>
      <h3 className="mt-1 font-heading text-xl font-black">@{developer.username}</h3>
      <p className="mt-2 gold-text font-heading text-4xl font-black">{developer.rating}</p>
      <p className="text-xs text-muted-foreground">GitScout score</p>
      <dl className="mt-5 grid w-full grid-cols-2 gap-3 border-t border-border/60 pt-4 text-left text-xs"><div><dt className="text-muted-foreground">Language</dt><dd className="mt-1 font-bold">{developer.topLanguage}</dd></div><div><dt className="text-muted-foreground">Location</dt><dd className="mt-1 truncate font-bold">{developer.location || 'Remote'}</dd></div><div><dt className="text-muted-foreground">Followers</dt><dd className="mt-1 font-bold">{compact.format(developer.followers)}</dd></div><div><dt className="text-muted-foreground">Stars</dt><dd className="mt-1 font-bold">{compact.format(developer.stars)}</dd></div></dl>
    </motion.article>;
}

function EmptyLeaderboard() {
    return <Card className="glass-panel items-center py-14 text-center"><CardHeader><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10"><Database className="size-7 text-primary"/></span><CardTitle className="mt-3 font-heading text-2xl font-black">The live leaderboard is warming up.</CardTitle><CardDescription className="mx-auto mt-2 max-w-md">Open any public GitHub profile with GitScout and it will appear here automatically.</CardDescription></CardHeader><CardContent><Button nativeButton={false} render={<Link href="/#scout"/>} className="premium-button">Scout a profile<ArrowRight data-icon="inline-end"/></Button></CardContent></Card>;
}

export function DeveloperLeaderboard({ developers = [] }) {
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState('All languages');
    const [rating, setRating] = useState('All');
    const [sort, setSort] = useState('Overall Rating');
    const languages = useMemo(() => ['All languages', ...new Set(developers.map((developer) => developer.topLanguage).filter(Boolean).sort())], [developers]);
    const filtered = useMemo(() => {
        const minimum = rating === 'All' ? 0 : Number.parseInt(rating, 10);
        const query = search.trim().toLowerCase();
        return developers.filter((developer) => !query || [developer.name, developer.username, developer.location, developer.topLanguage].filter(Boolean).some((value) => value.toLowerCase().includes(query))).filter((developer) => language === 'All languages' || developer.topLanguage === language).filter((developer) => developer.rating >= minimum).sort((left, right) => {
            if (sort === 'Followers') return right.followers - left.followers;
            if (sort === 'Stars') return right.stars - left.stars;
            if (sort === 'Repositories') return right.repositories - left.repositories;
            if (sort === 'Recently scouted') return Date.parse(right.lastScannedAt) - Date.parse(left.lastScannedAt);
            return right.rating - left.rating || right.stars - left.stars || right.followers - left.followers;
        });
    }, [developers, language, rating, search, sort]);
    const top = filtered.slice(0, 3);
    return <main className="relative overflow-hidden pb-20">
      <section className="relative isolate flex min-h-[430px] items-center overflow-hidden border-b border-primary/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 -z-20"/><div className="spotlight -left-20 top-0 -z-10 size-96"/><div className="spotlight -right-24 bottom-0 -z-10 size-80"/>
        {[12, 22, 36, 51, 67, 78, 89].map((left, index) => <motion.span key={left} className="ambient-particle absolute size-1" style={{ left: `${left}%`, top: `${18 + (index % 4) * 18}%` }} animate={{ y: [0, -14, 0], opacity: [.25, .8, .25] }} transition={{ duration: 3 + index * .3, repeat: Infinity, delay: index * .25 }}/>) }
        <div className="mx-auto max-w-4xl text-center"><p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary"><Trophy className="size-4"/> Live developer leaderboard</p><h1 className="mt-7 text-balance font-heading text-5xl font-black tracking-tight sm:text-7xl">Developers <span className="gold-text">in the field</span></h1><p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">Every public profile scouted on GitScout is ranked from its latest public GitHub activity.</p><div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Users className="size-4 text-primary"/>{developers.length} live profile{developers.length === 1 ? '' : 's'}</span><span className="flex items-center gap-2"><Sparkles className="size-4 text-primary"/>Updates on every scan</span></div></div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
        {developers.length > 0 && <Card className="glass-panel gap-0 rounded-3xl py-0"><CardHeader className="border-b border-border/60 p-5 sm:p-6"><CardTitle className="flex items-center gap-2 font-heading text-xl font-black"><SlidersHorizontal className="size-5 text-primary"/> Refine rankings</CardTitle><CardDescription>Search live GitScout profiles by developer, location, or primary language.</CardDescription></CardHeader><CardContent className="p-5 sm:p-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2"><span>Search profiles</span><span className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2"/><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search developer, language, location..." className="h-10 rounded-xl pl-9 normal-case tracking-normal"/></span></label><FilterSelect label="Language" value={language} onChange={setLanguage} options={languages}/><FilterSelect label="Card score" value={rating} onChange={setRating} options={['All', '90+', '80+', '70+']}/><FilterSelect label="Sort by" value={sort} onChange={setSort} options={['Overall Rating', 'Followers', 'Stars', 'Repositories', 'Recently scouted']}/></div></CardContent></Card>}

        {developers.length === 0 ? <EmptyLeaderboard /> : <><section aria-labelledby="podium-title">{top.length > 0 && <><div className="mb-7 text-center"><p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Live top cards</p><h2 id="podium-title" className="mt-2 font-heading text-3xl font-black">Top developers</h2></div><div className="grid items-start gap-4 md:grid-cols-3">{podiumOrder.map((sourceIndex, position) => top[sourceIndex] ? <PodiumCard key={top[sourceIndex].username} developer={top[sourceIndex]} position={position} className={podiumMeta[position].className}/> : null)}</div></>}</section>
        <section aria-labelledby="rankings-title"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Live standings</p><h2 id="rankings-title" className="mt-2 font-heading text-3xl font-black">Leaderboard</h2></div><p className="text-sm text-muted-foreground">{filtered.length} profile{filtered.length === 1 ? '' : 's'} found</p></div>
          {filtered.length === 0 ? <Card className="glass-panel items-center py-14 text-center"><CardHeader><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10"><Award className="size-7 text-primary"/></span><CardTitle className="mt-3 font-heading text-2xl font-black">No profiles found.</CardTitle><CardDescription>Try changing the search or filters.</CardDescription></CardHeader></Card> : <div className="glass-panel overflow-x-auto rounded-3xl"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-border/70 bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground"><tr>{['Rank', 'Developer', 'Score', 'Followers', 'Stars', 'Repositories', 'Top language', 'Last scouted', 'Action'].map((heading) => <th key={heading} className="px-4 py-4 font-bold">{heading}</th>)}</tr></thead><tbody>{filtered.map((developer, index) => <tr key={developer.username} className="border-b border-border/40 transition-colors last:border-0 hover:bg-primary/5"><td className="px-4 py-4 font-heading text-lg font-black text-primary">#{index + 1}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><Avatar className="size-10"><AvatarImage src={developer.avatar} alt={`${developer.name}'s profile`}/><AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback></Avatar><div><p className="font-bold">{developer.name}</p><p className="text-xs text-muted-foreground">@{developer.username}</p></div></div></td><td className="px-4 py-4"><strong className="gold-text text-xl">{developer.rating}</strong></td><td className="px-4 py-4">{compact.format(developer.followers)}</td><td className="px-4 py-4">{compact.format(developer.stars)}</td><td className="px-4 py-4">{developer.repositories}</td><td className="px-4 py-4 font-medium">{developer.topLanguage}</td><td className="px-4 py-4 text-muted-foreground">{scannedDate.format(new Date(developer.lastScannedAt))}</td><td className="px-4 py-4"><Button size="sm" variant="outline" nativeButton={false} render={<Link href={`/player/${developer.username}`}/>}>View profile<ArrowRight data-icon="inline-end"/></Button></td></tr>)}</tbody></table></div>}
        </section></>}
      </div>
    </main>;
}
