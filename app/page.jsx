import { ArrowRight, ExternalLink, GitBranch, GitCompareArrows } from 'lucide-react';
import Link from 'next/link';
import { DeveloperCard } from '@/components/developer-card';
import { HeroCardShowcase } from '@/components/hero-card-showcase';
import { LiveCardCount } from '@/components/live-card-count';
import { ProfileSearch } from '@/components/profile-search';
import { Reveal } from '@/components/reveal';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
const evanYouProfile = {
    login: 'yyx990803',
    name: 'Evan You',
    avatar: 'https://avatars.githubusercontent.com/u/499550?v=4',
    bio: 'Creator of Vite and Vue.js, building the next generation of frontend tools.',
    company: 'Independent',
    location: 'Singapore',
    website: 'https://evanyou.me',
    followers: 98000,
    following: 0,
    publicRepos: 180,
    joined: '2010-11-28T00:00:00Z',
    stars: 120000,
    forks: 0,
    totalSize: 0,
    languages: [{ name: 'TypeScript', value: 80 }, { name: 'JavaScript', value: 20 }],
    rating: 96,
    role: 'Frontend visionary',
    attributes: [
        { label: 'IMP', value: 98 },
        { label: 'SHP', value: 95 },
        { label: 'CRA', value: 97 },
        { label: 'COM', value: 96 },
        { label: 'CON', value: 93 },
        { label: 'RNG', value: 90 },
    ],
    repos: [],
    events: [],
};
const topDevCards = [
    {
        login: 'sindresorhus',
        name: 'Sindre Sorhus',
        avatar: 'https://avatars.githubusercontent.com/u/170270?v=4',
        bio: 'Open source maintainer with a deep catalog of JavaScript and TypeScript utilities.',
        company: 'Independent',
        location: 'Germany',
        website: 'https://sindresorhus.com',
        followers: 72100,
        following: 0,
        publicRepos: 1240,
        joined: '2009-12-20T00:00:00Z',
        stars: 382000,
        forks: 0,
        totalSize: 0,
        languages: [{ name: 'TypeScript', value: 70 }, { name: 'JavaScript', value: 30 }],
        rating: 98,
        role: 'Open-source ace',
        attributes: [{ label: 'IMP', value: 98 }, { label: 'SHP', value: 97 }, { label: 'CRA', value: 96 }, { label: 'COM', value: 95 }, { label: 'CON', value: 94 }, { label: 'RNG', value: 93 }],
        repos: [],
        events: [],
    },
    {
        login: 'gaearon',
        name: 'Dan Abramov',
        avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
        bio: 'JavaScript engineer known for React, Redux, and developer education.',
        company: 'Independent',
        location: 'UK',
        website: 'https://overreacted.io',
        followers: 85200,
        following: 0,
        publicRepos: 284,
        joined: '2011-06-02T00:00:00Z',
        stars: 198000,
        forks: 0,
        totalSize: 0,
        languages: [{ name: 'JavaScript', value: 64 }, { name: 'TypeScript', value: 36 }],
        rating: 97,
        role: 'UI systems lead',
        attributes: [{ label: 'IMP', value: 97 }, { label: 'SHP', value: 93 }, { label: 'CRA', value: 97 }, { label: 'COM', value: 96 }, { label: 'CON', value: 92 }, { label: 'RNG', value: 91 }],
        repos: [],
        events: [],
    },
    {
        login: 'torvalds',
        name: 'Linus Torvalds',
        avatar: 'https://avatars.githubusercontent.com/u/1024025?v=4',
        bio: 'Creator of Linux and Git, with a profile defined by systems-level impact.',
        company: 'Independent',
        location: 'USA',
        website: '',
        followers: 243000,
        following: 0,
        publicRepos: 9,
        joined: '2011-09-03T00:00:00Z',
        stars: 205000,
        forks: 0,
        totalSize: 0,
        languages: [{ name: 'C', value: 82 }, { name: 'C++', value: 18 }],
        rating: 96,
        role: 'Systems legend',
        attributes: [{ label: 'IMP', value: 99 }, { label: 'SHP', value: 88 }, { label: 'CRA', value: 98 }, { label: 'COM', value: 94 }, { label: 'CON', value: 91 }, { label: 'RNG', value: 86 }],
        repos: [],
        events: [],
    },
];
const topDevFanCards = [
    topDevCards[2],
    {
        login: 'ThePrimeagen',
        name: 'ThePrimeagen',
        avatar: 'https://avatars.githubusercontent.com/u/4458174?v=4',
        rating: 94,
        role: 'Terminal speedster',
        stars: 72000,
        forks: 0,
        languages: [{ name: 'Rust', value: 62 }],
        attributes: [{ label: 'SPD', value: 98 }, { label: 'VIM', value: 99 }],
    },
    topDevCards[0],
    topDevCards[1],
    evanYouProfile,
];
const featuredProjects = [
    {
        name: 'xo',
        language: 'JavaScript',
        href: 'https://github.com/sindresorhus/xo',
        description: 'Opinionated but configurable JavaScript/TypeScript linter and code style enforcer.',
    },
    {
        name: 'ky',
        language: 'TypeScript',
        href: 'https://github.com/sindresorhus/ky',
        description: 'Tiny and elegant HTTP client based on the browser Fetch API.',
    },
    {
        name: 'chalk',
        language: 'JavaScript',
        href: 'https://github.com/chalk/chalk',
        description: 'Terminal string styling done right. Much cleaner and faster than competitors.',
    },
];
export default function Home() {
    return (<>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <div className="hero-grid absolute inset-0 -z-20"/>
          <div className="spotlight -left-36 top-16 -z-10 size-[32rem]"/>
          <div className="spotlight -right-32 bottom-12 -z-10 size-[28rem]"/>

          <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal className="flex flex-col items-start gap-7">
              <p className="eyebrow">
                <GitBranch className="size-3.5"/>
                GitHub x developer cards
              </p>
              <h1 className="max-w-3xl font-heading text-6xl font-black uppercase leading-[.84] tracking-tight sm:text-7xl lg:text-8xl">
                Get carded.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Your public GitHub stats turned into a collectible developer card rated out of 99.
              </p>
              <div id="scout" className="w-full scroll-mt-28">
                <ProfileSearch />
              </div>
              <div className="grid gap-4 text-sm text-muted-foreground">
                <p>
                  try{' '}
                  <Link href="/player/torvalds" className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary">torvalds</Link>
                  {' '}·{' '}
                  <Link href="/player/sindresorhus" className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary">sindresorhus</Link>
                  {' '}· or your own
                </p>
                <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]"/>
                    <LiveCardCount />
                    cards rated
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button nativeButton={false} render={<Link href="/player/sindresorhus"/>}>
                  View Sindre's card
                  <ArrowRight data-icon="inline-end"/>
                </Button>
                <Button variant="outline" nativeButton={false} render={<Link href="/compare?left=sindresorhus&right=gaearon"/>}>
                  <GitCompareArrows data-icon="inline-start"/>
                  Compare
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="relative"><HeroCardShowcase developer={topDevCards[0]}/></Reveal>
          </div>
        </section>

        <section className="overflow-hidden border-y border-border/50 bg-card/20 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow mb-3">Top dev cards</p>
                <h2 className="font-heading text-3xl font-black tracking-tight">Highest-rated profiles</h2>
              </div>
              <Button variant="ghost" nativeButton={false} render={<Link href="/leaderboard"/>}>
                View leaderboard
                <ArrowRight data-icon="inline-end"/>
              </Button>
            </div>
            <div className="top-dev-card-fan" aria-label="Top developer cards">
              {topDevFanCards.map((developer, index) => (<Link key={developer.login} href={`/player/${developer.login}`} className={`top-dev-fan-card top-dev-fan-card-${index}`} aria-label={`View ${developer.name}'s GitScout`}>
                  <DeveloperCard developer={developer} compact/>
                </Link>))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="eyebrow mb-4">Featured repositories</p>
            <h2 className="font-heading text-4xl font-black tracking-tight">Real projects, shown like a card collection.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              GitScout keeps the entry point simple, then gives visitors a way to inspect the repositories behind the rating.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (<a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="repo-card glass-panel-subtle group flex min-h-60 flex-col p-5">
                <span className="w-fit rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">{project.language}</span>
                <h3 className="mt-6 font-heading text-xl font-black tracking-tight group-hover:text-primary">{project.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Open repository
                  <ExternalLink className="size-4"/>
                </span>
              </a>))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>);
}
