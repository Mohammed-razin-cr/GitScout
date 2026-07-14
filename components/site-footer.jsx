import { BarChart3, GitBranch, Swords } from 'lucide-react';
import Link from 'next/link';
export function SiteFooter() {
    return (<footer className="relative mt-24 overflow-hidden border-t border-primary/15">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]"/>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="flex max-w-md flex-col gap-4"><Link href="/" className="flex items-center gap-3 font-heading text-xl font-bold"><span className="brand-mark"><GitBranch /></span>GitScout</Link><p className="text-sm leading-relaxed text-muted-foreground">Clean profile cards built from public GitHub activity.</p></div>
        <div className="flex flex-col gap-3 text-sm"><p className="font-semibold text-foreground">Explore</p><Link className="footer-link" href="/#scout">Build a card</Link><Link className="footer-link flex items-center gap-2" href="/compare"><Swords className="size-4"/>Compare</Link><Link className="footer-link flex items-center gap-2" href="/leaderboard"><BarChart3 className="size-4"/>Leaderboard</Link></div>
        <div className="flex flex-col gap-3 text-sm"><p className="font-semibold text-foreground">About</p><a className="footer-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div>
      </div>
      <div className="border-t border-border/50"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© 2026 GitScout.</p><p>Made for GitHub profiles that deserve a better first look.</p></div></div>
    </footer>);
}
