'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Crown, Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { compactNumber } from '@/lib/github';
export function LeaderboardTable({ developers }) {
    const [sort, setSort] = useState('rating');
    const [query, setQuery] = useState('');
    const rows = useMemo(() => developers.filter((d) => `${d.name} ${d.login}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => b[sort] - a[sort]), [developers, query, sort]);
    return <div>
    <div className="glass-panel flex flex-col gap-4 rounded-3xl p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between"><div className="overflow-x-auto"><Tabs value={sort} onValueChange={(value) => setSort(value)}><TabsList className="w-max rounded-2xl bg-background/45"><TabsTrigger value="rating">Rating</TabsTrigger><TabsTrigger value="stars">Stars</TabsTrigger><TabsTrigger value="followers">Followers</TabsTrigger><TabsTrigger value="publicRepos">Repos</TabsTrigger></TabsList></Tabs></div><div className="relative"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary"/><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the roster" className="h-11 rounded-2xl border-primary/15 bg-background/50 pl-11 lg:w-72"/></div></div>
    <div className="mt-6 flex flex-col gap-3">{rows.map((developer, index) => <Link href={`/player/${developer.login}`} key={developer.login} className="glass-panel group grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-3xl p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 sm:grid-cols-[54px_1fr_auto] sm:gap-5 sm:p-4 lg:grid-cols-[54px_1fr_110px_120px_120px]">
      <div className="flex size-10 items-center justify-center rounded-2xl border border-primary/15 bg-background/45 font-heading text-sm font-black text-primary sm:size-12">{index === 0 ? <Crown className="size-5"/> : String(index + 1).padStart(2, '0')}</div>
      <div className="flex min-w-0 items-center gap-3 sm:gap-4"><div className="relative shrink-0"><Image src={developer.avatar} alt={`${developer.name} avatar`} width={52} height={52} className="size-11 rounded-2xl object-cover ring-1 ring-primary/25 sm:size-13" unoptimized/><span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-card bg-primary"/></div><div className="min-w-0"><p className="truncate font-heading text-base font-bold sm:text-lg">{developer.name}</p><p className="truncate font-mono text-xs text-muted-foreground">@{developer.login} · {developer.role}</p><div className="mt-2 flex gap-3 text-[10px] text-muted-foreground lg:hidden"><span>{compactNumber(developer.stars)} stars</span><span>{compactNumber(developer.followers)} followers</span></div></div></div>
      <Badge className="justify-self-end gap-1 rounded-xl px-3 py-2 text-base"><Star className="size-3"/>{developer.rating}</Badge><p className="hidden text-right font-mono text-sm lg:block">{compactNumber(developer.stars)} <span className="text-muted-foreground">stars</span></p><p className="hidden text-right font-mono text-sm lg:block">{compactNumber(developer.followers)} <span className="text-muted-foreground">fans</span></p><p className="hidden text-right font-mono text-sm lg:block">{developer.publicRepos} <span className="text-muted-foreground">repos</span></p>
    </Link>)}</div>
  </div>;
}
