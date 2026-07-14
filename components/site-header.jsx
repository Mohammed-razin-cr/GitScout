'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, GitBranch, Menu, Moon, Sun, Swords } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
const links = [
    { href: '/compare', label: 'Compare', icon: Swords },
    { href: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
];
export function SiteHeader() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (<header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-3xl border border-primary/15 bg-background/65 px-3 shadow-2xl shadow-background/50 backdrop-blur-2xl sm:px-5">
        <Link href="/" className="group flex items-center gap-3">
          <span className="brand-mark"><GitBranch /></span>
          <span className="font-heading text-lg font-black tracking-tight">Git<span className="gold-text">Scout</span></span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => <Button key={href} variant="ghost" nativeButton={false} render={<Link href={href}/>}>{label}</Button>)}
          <Button variant="ghost" nativeButton={false} render={<a href="https://github.com/Mohammed-razin-cr/GitScout" target="_blank" rel="noreferrer"/>}>Connect</Button>
          <Button aria-label="Toggle theme" variant="ghost" size="icon" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{mounted && resolvedTheme === 'dark' ? <Sun /> : <Moon />}</Button>
          <Button nativeButton={false} render={<Link href="/#scout"/>} className="premium-button ml-2 rounded-xl">Build a card</Button>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <Button aria-label="Toggle theme" variant="ghost" size="icon" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{mounted && resolvedTheme === 'dark' ? <Sun /> : <Moon />}</Button>
          <Sheet>
            <SheetTrigger render={<Button aria-label="Open navigation" variant="ghost" size="icon"><Menu /></Button>}/>
            <SheetContent side="right" className="w-[min(86vw,340px)] border-primary/15 bg-background/90 p-6 backdrop-blur-2xl">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-12 flex flex-col gap-3">{links.map(({ href, label, icon: Icon }) => <Button key={href} variant="ghost" nativeButton={false} render={<Link href={href}/>} className="h-11 justify-start"><Icon data-icon="inline-start"/>{label}</Button>)}<Button variant="ghost" nativeButton={false} render={<a href="https://github.com/Mohammed-razin-cr/GitScout" target="_blank" rel="noreferrer"/>} className="h-11 justify-start">Connect</Button><Button nativeButton={false} render={<Link href="/#scout"/>} className="premium-button mt-4 h-11">Build a card</Button></div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>);
}
