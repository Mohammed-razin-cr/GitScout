'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { CharacterCard } from '@/components/character-card';
import { TraitChart } from '@/components/trait-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { universes } from '@/lib/characters';
function developerTraits(developer) {
    const value = (label) => developer.attributes.find((item) => item.label === label)?.value ?? 60;
    return { courage: value('Shipping'), intelligence: value('Craft'), loyalty: value('Consistency'), leadership: value('Impact'), empathy: value('Community'), humor: value('Range') };
}
export function DeveloperCharacterMatch({ developer }) {
    const [universe, setUniverse] = useState('Marvel');
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(false);
    const traits = developerTraits(developer);
    const forge = async () => { setLoading(true); try {
        const response = await fetch('/api/match', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ universe, traits }) });
        const data = await response.json();
        if (!response.ok)
            throw new Error(data.error);
        setMatch(data);
    }
    catch (error) {
        toast.error(error instanceof Error ? error.message : 'Character match failed');
    }
    finally {
        setLoading(false);
    } };
    const recommendations = match?.recommendations ?? match?.similarCharacters ?? [];
    return <section id="character-match" className="scroll-mt-36 border-t border-primary/10 py-14"><div className="mb-8 max-w-3xl"><p className="eyebrow"><Sparkles className="size-3.5"/> Character lens</p><h2 className="mt-4 text-balance font-heading text-3xl font-black tracking-tight sm:text-4xl">Which character codes like {developer.name}?</h2><p className="mt-3 leading-relaxed text-muted-foreground">The six GitScout attributes can also be read as personality traits. Choose a universe and generate a playful match.</p></div><Tabs value={universe} onValueChange={(value) => setUniverse(value)}><div className="overflow-x-auto"><TabsList className="w-max">{universes.map((item) => <TabsTrigger key={item} value={item}>{item}</TabsTrigger>)}</TabsList></div></Tabs><Button onClick={forge} disabled={loading} className="premium-button mt-5">{loading ? 'Finding a match...' : 'Reveal character match'} <Sparkles data-icon="inline-end"/></Button>{match && <div className="mt-10 grid items-center gap-8 lg:grid-cols-[420px_1fr]"><CharacterCard match={match} compact/><div className="grid gap-5"><Card className="glass-panel"><CardHeader><CardTitle>{match.matchPercentage}% match with {match.characterName}</CardTitle><CardDescription>{match.tagline}</CardDescription></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{match.explanation}</p></CardContent></Card><TraitChart traits={traits} characterTraits={match.characterTraits}/><div className="flex flex-wrap gap-2">{recommendations.map((item) => <span key={item} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary">{item}</span>)}</div></div></div>}</section>;
}
