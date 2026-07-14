'use client';
import { toPng } from 'html-to-image';
import { CalendarDays, Copy, Download, ExternalLink, GitFork, MapPin, Share2, Sparkles, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';
import { toast } from 'sonner';
import { ActivityGrid } from '@/components/activity-grid';
import { AnimatedCounter } from '@/components/animated-counter';
import { DeveloperCard } from '@/components/developer-card';
import { DeveloperCharacterMatch } from '@/components/developer-character-match';
import { ProfileSectionNav } from '@/components/profile-section-nav';
import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { compactNumber } from '@/lib/github';
const chartColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
export function PlayerDashboard({ developer }) {
    const cardRef = useRef(null);
    const copy = async () => { await navigator.clipboard.writeText(window.location.href); toast.success('Profile link copied'); };
    const share = async () => { if (navigator.share)
        await navigator.share({ title: `${developer.name} on GitScout`, url: window.location.href });
    else
        await copy(); };
    const download = async () => { if (!cardRef.current)
        return; const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true }); const link = document.createElement('a'); link.download = `${developer.login}-gitcard.png`; link.href = url; link.click(); toast.success('Profile card exported'); };
    const metrics = [
        { icon: Star, value: developer.stars, label: 'Stars earned' },
        { icon: GitFork, value: developer.forks, label: 'Forks inspired' },
        { icon: Users, value: developer.followers, label: 'Followers' },
        { icon: ExternalLink, value: developer.publicRepos, label: 'Public repos' },
    ];
    return <main className="overflow-hidden">
    <section className="relative border-b border-primary/10">
      <div className="spotlight left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2"/>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal><div className="max-w-3xl"><Badge variant="outline" className="border-primary/25 bg-primary/5 px-3 py-1.5 text-primary"><Sparkles /> Public GitHub profile</Badge><h1 className="mt-5 text-balance font-heading text-4xl font-black tracking-[-.04em] sm:text-5xl lg:text-7xl">{developer.name}</h1><p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{developer.bio}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><span className="flex items-center gap-2"><MapPin className="size-4 text-primary"/>{developer.location}</span><span className="flex items-center gap-2"><CalendarDays className="size-4 text-primary"/>On GitHub since {new Date(developer.joined).getFullYear()}</span><span className="flex items-center gap-2"><Users className="size-4 text-primary"/>{compactNumber(developer.followers)} followers</span></div></div></Reveal>
          <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={copy}><Copy data-icon="inline-start"/>Copy</Button><Button variant="outline" onClick={share}><Share2 data-icon="inline-start"/>Share</Button><Button className="premium-button" onClick={download}><Download data-icon="inline-start"/>Export card</Button></div>
        </div>
      </div>
    </section>

    <ProfileSectionNav />

    <section id="overview" className="mx-auto grid max-w-7xl scroll-mt-36 gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(340px,460px)_1fr] lg:gap-14 lg:px-8">
      <Reveal><div id="developer-card" className="flex scroll-mt-36 flex-col items-center lg:sticky lg:top-36"><div className="card-stage"><DeveloperCard developer={developer} exportRef={cardRef}/></div><Button variant="outline" className="mt-7 w-full max-w-[440px]" nativeButton={false} render={<Link href={`/compare?left=${developer.login}`}/>}>Compare this profile</Button><p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[.22em] text-muted-foreground">Move your cursor across the card</p></div></Reveal>

      <div id="analytics" className="min-w-0 scroll-mt-36">
        <Reveal><div className="grid grid-cols-2 gap-3 sm:gap-4">{metrics.map(({ icon: Icon, value, label }) => <Card key={label} className="glass-panel group overflow-hidden"><CardContent className="relative p-4 sm:p-6"><Icon className="mb-6 size-5 text-primary transition-transform group-hover:-translate-y-1"/><p className="font-heading text-3xl font-black tracking-tight sm:text-4xl"><AnimatedCounter value={value} formatter={compactNumber}/></p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-muted-foreground sm:text-xs">{label}</p></CardContent></Card>)}</div></Reveal>

        <Tabs defaultValue="overview" className="mt-8">
          <div className="overflow-x-auto pb-1"><TabsList className="w-max min-w-full rounded-2xl border border-primary/10 bg-card/65 p-1 backdrop-blur-xl sm:w-auto sm:min-w-0"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="repos">Repositories</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList></div>
          <TabsContent value="overview" className="mt-5"><div className="grid gap-4 xl:grid-cols-2">
            <Card className="glass-panel"><CardHeader><CardTitle className="text-xl">Profile attributes</CardTitle><CardDescription>Weighted from public profile and repository data.</CardDescription></CardHeader><CardContent className="flex flex-col gap-5">{developer.attributes.map((attribute) => <div key={attribute.label}><div className="mb-2 flex justify-between text-sm"><span>{attribute.label}</span><span className="font-mono text-primary">{attribute.value}</span></div><Progress value={attribute.value}/></div>)}</CardContent></Card>
            <Card className="glass-panel"><CardHeader><CardTitle className="text-xl">Language signature</CardTitle><CardDescription>Repository size across source projects.</CardDescription></CardHeader><CardContent><div className="relative h-72"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={developer.languages} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="82%" paddingAngle={4} cornerRadius={8}>{developer.languages.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} stroke="transparent"/>)}</Pie><ChartTooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 16, boxShadow: '0 16px 48px oklch(0 0 0 / .35)' }}/></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="gold-text font-heading text-3xl font-black">{developer.languages.length}</span><span className="text-[9px] uppercase tracking-[.18em] text-muted-foreground">languages</span></div></div><div className="flex flex-wrap justify-center gap-3">{developer.languages.map((language, index) => <span key={language.name} className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }}/>{language.name}</span>)}</div></CardContent></Card>
          </div></TabsContent>
          <TabsContent id="repositories" value="repos" className="mt-5 scroll-mt-36"><div className="grid gap-3">{developer.repos.map((repo) => <Card key={repo.name} className="glass-panel transition-transform hover:-translate-y-1"><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><CardTitle className="truncate text-lg"><a href={repo.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">{repo.name}</a></CardTitle><CardDescription className="mt-2 line-clamp-2">{repo.description}</CardDescription></div><Badge variant="secondary" className="w-fit">{repo.language}</Badge></div></CardHeader><CardContent className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><span>{repo.stars} stars</span><span>{repo.forks} forks</span><span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span></CardContent></Card>)}</div></TabsContent>
          <TabsContent value="activity" className="mt-5"><Card className="glass-panel"><CardHeader><CardTitle>Recent public activity</CardTitle><CardDescription>Contribution-style view derived from available public events.</CardDescription></CardHeader><CardContent className="flex flex-col gap-6"><ActivityGrid events={developer.events}/><div>{developer.events.length ? developer.events.map((event, index) => <div key={`${event.repo}-${index}`} className="flex flex-col gap-2 border-b border-primary/10 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="font-medium">{event.type}</p><p className="truncate text-sm text-muted-foreground">{event.repo}</p></div><p className="shrink-0 font-mono text-xs text-primary/70">{new Date(event.createdAt).toLocaleDateString()}</p></div>) : <p className="text-muted-foreground">No recent public events are available.</p>}</div></CardContent></Card></TabsContent>
        </Tabs>
      </div>
    </section>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><DeveloperCharacterMatch developer={developer}/></div>
  </main>;
}
