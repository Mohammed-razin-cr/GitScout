'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function CompareSearch({ left = '', right = '' }) {
    const router = useRouter();
    const [a, setA] = useState(left);
    const [b, setB] = useState(right);
    return <form onSubmit={(event) => { event.preventDefault(); if (a.trim() && b.trim())
        router.push(`/compare?left=${encodeURIComponent(a.trim())}&right=${encodeURIComponent(b.trim())}`); }} className="glass-panel grid gap-3 p-3 sm:grid-cols-[1fr_1fr_auto]"><Input value={a} onChange={(event) => setA(event.target.value)} aria-label="First GitHub username" placeholder="First GitHub username" className="h-12"/><Input value={b} onChange={(event) => setB(event.target.value)} aria-label="Second GitHub username" placeholder="Second GitHub username" className="h-12"/><Button type="submit" className="premium-button h-12"><Swords data-icon="inline-start"/>Compare</Button></form>;
}
