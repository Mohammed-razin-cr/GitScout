'use client';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function ErrorPage({ error, reset }) { return <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"><div className="spotlight left-1/2 top-1/3 h-96 w-[42rem] -translate-x-1/2"/><div className="glass-panel relative max-w-xl rounded-3xl p-10 text-center sm:p-14"><AlertTriangle className="mx-auto size-10 text-primary"/><h1 className="mt-6 font-heading text-3xl font-bold">Something did not load</h1><p className="mt-4 leading-relaxed text-muted-foreground">{error.message || 'GitScout could not load this view right now. Please try again.'}</p><Button className="premium-button mt-8" onClick={reset}>Try again</Button></div></main>; }
