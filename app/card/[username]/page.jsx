import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Code2, GitFork, Star, Users } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { compactNumber, getDeveloper } from '@/lib/github';
import { saveScoutedProfile } from '@/lib/scouted-profiles';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { username } = await params;
    const developer = await getDeveloper(username);
    if (!developer)
        return { title: 'Developer card unavailable' };
    const title = `${developer.name} · GitScout card`;
    const description = `${developer.name}'s GitScout score is ${developer.rating}/99, based on public GitHub activity.`;
    const image = `/card/${encodeURIComponent(developer.login)}/opengraph-image`;
    return { title, description, openGraph: { title, description, type: 'profile', images: [{ url: image, width: 1200, height: 630, alt: `${developer.name}'s GitScout developer card` }] }, twitter: { card: 'summary_large_image', title, description, images: [image] } };
}

export default async function ShareableCardPage({ params }) {
    const { username } = await params;
    const developer = await getDeveloper(username);
    if (!developer)
        notFound();
    await saveScoutedProfile(developer);
    const primaryLanguage = developer.languages?.[0]?.name ?? 'Code';
    return <><SiteHeader /><main className="relative isolate overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8"><div className="hero-grid absolute inset-0 -z-20"/><div className="spotlight left-1/2 top-16 -z-10 h-[34rem] w-[48rem] -translate-x-1/2"/><section className="mx-auto max-w-4xl"><p className="mb-5 text-center font-mono text-xs font-black uppercase tracking-[.28em] text-primary">GitScout share card</p><article className="glass-panel overflow-hidden rounded-[2rem] border-primary/30 shadow-[0_35px_120px_oklch(.04_.03_18/.7)]"><div className="relative overflow-hidden border-b border-primary/20 bg-[radial-gradient(circle_at_80%_22%,oklch(.72_.13_72/.22),transparent_27%),linear-gradient(145deg,oklch(.34_.15_22/.7),transparent_60%)] p-6 sm:p-10"><div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,oklch(.9_.08_85/.08),transparent)]"/><div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-mono text-xs font-black uppercase tracking-[.28em] text-primary">Rated out of 99</p><p className="gold-text mt-3 font-heading text-8xl font-black leading-none tracking-[-.08em] sm:text-9xl">{developer.rating}</p><p className="mt-3 font-mono text-sm font-black uppercase tracking-[.22em]">Developer</p></div><img src={developer.avatar} alt={`${developer.name} avatar`} className="size-28 rounded-full border-4 border-primary/30 object-cover shadow-[0_0_45px_oklch(.72_.13_72/.25)] sm:size-36"/></div><div className="relative mt-10"><p className="font-heading text-4xl font-black tracking-tight sm:text-6xl">{developer.name}</p><p className="mt-2 font-mono text-base text-primary">@{developer.login}</p><p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{developer.bio}</p></div></div><div className="grid gap-px bg-primary/15 sm:grid-cols-4"><CardStat icon={Star} label="Stars" value={compactNumber(developer.stars)}/><CardStat icon={GitFork} label="Forks" value={compactNumber(developer.forks)}/><CardStat icon={Users} label="Followers" value={compactNumber(developer.followers)}/><CardStat icon={Code2} label="Core stack" value={primaryLanguage}/></div></article><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button nativeButton={false} render={<Link href={`/player/${developer.login}`}/>} className="premium-button">View full profile<ArrowRight data-icon="inline-end"/></Button><Button nativeButton={false} render={<a href={`https://github.com/${developer.login}`} target="_blank" rel="noreferrer"/>} variant="outline">Open GitHub profile</Button></div></section></main><SiteFooter /></>;
}

function CardStat({ icon: Icon, label, value }) {
    return <div className="bg-background/80 p-5 text-center sm:p-7"><Icon className="mx-auto mb-3 size-5 text-primary"/><p className="font-heading text-2xl font-black">{value}</p><p className="mt-1 text-[10px] font-black uppercase tracking-[.2em] text-muted-foreground">{label}</p></div>;
}
