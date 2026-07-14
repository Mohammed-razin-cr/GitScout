'use client';
import { ArrowRightLeft, RotateCcw, Swords } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function CompareForm({ left = '', right = '' }) {
    const router = useRouter();
    const [a, setA] = useState(left);
    const [b, setB] = useState(right);
    const go = () => { if (a.trim() && b.trim())
        router.push(`/compare?left=${encodeURIComponent(a.trim())}&right=${encodeURIComponent(b.trim())}`); };
    return <div className="glass-panel flex w-full flex-col gap-3 rounded-3xl p-3 sm:p-4 lg:flex-row lg:items-center">
    <Input aria-label="First GitHub username" placeholder="First username" value={a} onChange={(e) => setA(e.target.value)} className="h-12 rounded-2xl border-primary/15 bg-background/50"/>
    <Button variant="outline" size="icon" className="mx-auto shrink-0 rounded-full lg:mx-0" aria-label="Swap developers" onClick={() => { setA(b); setB(a); }}><ArrowRightLeft /></Button>
    <Input aria-label="Second GitHub username" placeholder="Second username" value={b} onChange={(e) => setB(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229)
        go(); }} className="h-12 rounded-2xl border-primary/15 bg-background/50"/>
    <Button className="premium-button h-12 shrink-0 px-6" onClick={go}><Swords data-icon="inline-start"/>Compare</Button>
    <Button variant="ghost" size="icon" className="mx-auto shrink-0 lg:mx-0" aria-label="Reset comparison" onClick={() => { setA(''); setB(''); router.push('/compare'); }}><RotateCcw /></Button>
  </div>;
}
