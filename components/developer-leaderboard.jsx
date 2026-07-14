'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award, Search, SlidersHorizontal, Sparkles, Trophy, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { leaderboardDevelopers, leaderboardOptions } from '@/lib/leaderboard-data';
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
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
    return <motion.article initial={reduce ? false : { opacity: 0, y: 28 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ delay: position * 0.1 }} whileHover={reduce ? undefined : { y: -8 }} className={cn('glass-panel relative flex flex-col items-center overflow-hidden p-5 text-center', className)}>
    <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-primary/10 blur-3xl"/>
    <span className="relative mb-3 flex size-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 font-heading text-lg font-black text-primary">{meta.mark}</span>
    <Avatar className="relative size-20 ring-4 ring-primary/15"><AvatarImage src={developer.avatar} alt={`${developer.name}'s profile`}/><AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback></Avatar>
    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-primary">{meta.label} place</p>
    <h3 className="mt-1 font-heading text-xl font-black">@{developer.username}</h3>
    <p className="mt-2 gold-text font-heading text-4xl font-black">{developer.rating}</p>
    <p className="text-xs text-muted-foreground">Overall rating</p>
    <dl className="mt-5 grid w-full grid-cols-2 gap-3 border-t border-border/60 pt-4 text-left text-xs"><div><dt className="text-muted-foreground">Location</dt><dd className="mt-1 font-bold">{developer.state ? `${developer.state}, ` : ''}{developer.country}</dd></div><div><dt className="text-muted-foreground">Top language</dt><dd className="mt-1 font-bold">{developer.topLanguage}</dd></div><div><dt className="text-muted-foreground">Followers</dt><dd className="mt-1 font-bold">{compact.format(developer.followers)}</dd></div><div><dt className="text-muted-foreground">Stars</dt><dd className="mt-1 font-bold">{compact.format(developer.stars)}</dd></div></dl>
  </motion.article>;
}
export function DeveloperLeaderboard() {
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('Global');
    const [state, setState] = useState('All states');
    const [language, setLanguage] = useState('All languages');
    const [rating, setRating] = useState('All');
    const [experience, setExperience] = useState('All experience');
    const [sort, setSort] = useState('Overall Rating');
    const filtered = useMemo(() => {
        const minimum = rating === 'All' ? 0 : Number.parseInt(rating);
        const stateQuery = search.trim().toLowerCase();
        const matches = leaderboardDevelopers
            .filter((developer) => !stateQuery || developer.state?.toLowerCase().includes(stateQuery))
            .filter((developer) => country === 'Global' || developer.country === country)
            .filter((developer) => country !== 'India' || state === 'All states' || developer.state === state)
            .filter((developer) => language === 'All languages' || developer.topLanguage === language)
            .filter((developer) => developer.rating >= minimum)
            .filter((developer) => experience === 'All experience' || developer.experience === experience);
        const topByState = stateQuery
            ? Array.from(matches.reduce((leaders, developer) => {
                if (!developer.state)
                    return leaders;
                const current = leaders.get(developer.state);
                if (!current || developer.rating > current.rating)
                    leaders.set(developer.state, developer);
                return leaders;
            }, new Map()).values())
            : matches;
        return topByState.sort((a, b) => {
            if (sort === 'Followers')
                return b.followers - a.followers;
            if (sort === 'Stars')
                return b.stars - a.stars;
            if (sort === 'Repositories')
                return b.repositories - a.repositories;
            if (sort === 'Contributions')
                return b.contributions - a.contributions;
            if (sort === 'Newest')
                return Date.parse(b.joinedAt) - Date.parse(a.joinedAt);
            return b.rating - a.rating;
        });
    }, [country, experience, language, rating, search, sort, state]);
    const top = filtered.slice(0, 3);
    return <main className="relative overflow-hidden pb-20">
    <section className="relative isolate flex min-h-[430px] items-center overflow-hidden border-b border-primary/10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="hero-grid absolute inset-0 -z-20"/><div className="spotlight -left-20 top-0 -z-10 size-96"/><div className="spotlight -right-24 bottom-0 -z-10 size-80"/>
      {[12, 22, 36, 51, 67, 78, 89].map((left, index) => <motion.span key={left} className="ambient-particle absolute size-1" style={{ left: `${left}%`, top: `${18 + (index % 4) * 18}%` }} animate={{ y: [0, -14, 0], opacity: [.25, .8, .25] }} transition={{ duration: 3 + index * .3, repeat: Infinity, delay: index * .25 }}/>)}
      <div className="mx-auto max-w-4xl text-center"><p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary"><Trophy className="size-4"/> Developer leaderboard</p><h1 className="mt-7 text-balance font-heading text-5xl font-black tracking-tight sm:text-7xl">Developer <span className="gold-text">Rankings</span></h1><p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">Browse sample profiles and compare how GitScout summarizes public GitHub activity.</p><div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Users className="size-4 text-primary"/>{leaderboardDevelopers.length} ranked builders</span><span className="flex items-center gap-2"><Sparkles className="size-4 text-primary"/>Sample dataset</span></div></div>
    </section>

    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="glass-panel gap-0 rounded-3xl py-0"><CardHeader className="border-b border-border/60 p-5 sm:p-6"><CardTitle className="flex items-center gap-2 font-heading text-xl font-black"><SlidersHorizontal className="size-5 text-primary"/> Refine rankings</CardTitle><CardDescription>Search and combine filters to find standout developers.</CardDescription></CardHeader><CardContent className="p-5 sm:p-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2"><span>Search state</span><span className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2"/><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Karnataka, Kerala, Delhi..." aria-describedby="state-search-help" className="h-10 rounded-xl pl-9 normal-case tracking-normal"/></span><span id="state-search-help" className="normal-case tracking-normal">Shows the highest-rated developer from every matching state.</span></label><FilterSelect label="Country" value={country} onChange={(value) => { setCountry(value); setState('All states'); }} options={leaderboardOptions.countries}/>{country === 'India' && <FilterSelect label="State" value={state} onChange={setState} options={leaderboardOptions.states}/>}<FilterSelect label="Language" value={language} onChange={setLanguage} options={leaderboardOptions.languages}/><FilterSelect label="Card score" value={rating} onChange={setRating} options={leaderboardOptions.ratings}/><FilterSelect label="Experience" value={experience} onChange={setExperience} options={leaderboardOptions.experience}/><FilterSelect label="Sort by" value={sort} onChange={setSort} options={leaderboardOptions.sort}/></div></CardContent></Card>

      {top.length > 0 && <section aria-labelledby="podium-title"><div className="mb-7 text-center"><p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Top cards</p><h2 id="podium-title" className="mt-2 font-heading text-3xl font-black">Top developers</h2></div><div className="grid items-start gap-4 md:grid-cols-3">{podiumOrder.map((sourceIndex, position) => top[sourceIndex] ? <PodiumCard key={top[sourceIndex].id} developer={top[sourceIndex]} position={position} className={podiumMeta[position].className}/> : null)}</div></section>}

      <section aria-labelledby="rankings-title"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Complete standings</p><h2 id="rankings-title" className="mt-2 font-heading text-3xl font-black">Leaderboard</h2></div><p className="text-sm text-muted-foreground">{filtered.length} developer{filtered.length === 1 ? '' : 's'} found</p></div>
        {filtered.length === 0 ? <Card className="glass-panel items-center py-14 text-center"><CardHeader><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10"><Award className="size-7 text-primary"/></span><CardTitle className="mt-3 font-heading text-2xl font-black">No developers found.</CardTitle><CardDescription>Try changing your search or filters.</CardDescription></CardHeader></Card> : <div className="glass-panel overflow-x-auto rounded-3xl"><table className="w-full min-w-[1040px] text-left text-sm"><thead className="border-b border-border/70 bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground"><tr>{['Rank', 'Developer', 'Overall rating', 'Followers', 'Stars', 'Repositories', 'Contributions', 'Top language', 'Country', 'State', 'Action'].map((heading) => <th key={heading} className="px-4 py-4 font-bold">{heading}</th>)}</tr></thead><tbody>{filtered.map((developer, index) => <tr key={developer.id} className="border-b border-border/40 transition-colors last:border-0 hover:bg-primary/5"><td className="px-4 py-4 font-heading text-lg font-black text-primary">#{index + 1}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><Avatar className="size-10"><AvatarImage src={developer.avatar} alt={`${developer.name}'s profile`}/><AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback></Avatar><div><p className="font-bold">{developer.name}</p><p className="text-xs text-muted-foreground">@{developer.username}</p></div></div></td><td className="px-4 py-4"><strong className="gold-text text-xl">{developer.rating}</strong></td><td className="px-4 py-4">{compact.format(developer.followers)}</td><td className="px-4 py-4">{compact.format(developer.stars)}</td><td className="px-4 py-4">{developer.repositories}</td><td className="px-4 py-4">{compact.format(developer.contributions)}</td><td className="px-4 py-4 font-medium">{developer.topLanguage}</td><td className="px-4 py-4">{developer.country}</td><td className="px-4 py-4 text-muted-foreground">{developer.state ?? '—'}</td><td className="px-4 py-4"><Button size="sm" variant="outline" nativeButton={false} render={<Link href={`/player/${developer.username}`}/>}>View profile<ArrowRight data-icon="inline-end"/></Button></td></tr>)}</tbody></table></div>}
      </section>
    </div>
  </main>;
}
