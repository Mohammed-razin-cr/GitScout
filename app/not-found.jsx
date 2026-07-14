import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
export default function NotFound() { return <><SiteHeader /><main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4"><div className="spotlight left-1/2 top-1/3 h-96 w-[42rem] -translate-x-1/2"/><div className="glass-panel relative max-w-xl rounded-3xl p-10 text-center sm:p-14"><SearchX className="mx-auto size-10 text-primary"/><p className="gold-text mt-6 font-heading text-7xl font-black">404</p><h1 className="mt-3 font-heading text-3xl font-bold">Page not found</h1><p className="mt-4 leading-relaxed text-muted-foreground">That card or page is not available.</p><Button className="premium-button mt-8" nativeButton={false} render={<Link href="/"/>}>Back to GitScout</Button></div></main></>; }
