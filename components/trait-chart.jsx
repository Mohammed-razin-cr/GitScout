'use client';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { traitKeys, traitLabels } from '@/lib/characters';
export function TraitChart({ user, character }) {
    const data = traitKeys.map((key) => ({ trait: traitLabels[key], You: user[key], Character: character[key] }));
    return <div className="h-[320px] w-full"><ResponsiveContainer width="100%" height="100%"><RadarChart data={data}><PolarGrid stroke="var(--border)"/><PolarAngleAxis dataKey="trait" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}/><Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 16 }}/><Radar name="You" dataKey="You" stroke="var(--primary)" fill="var(--primary)" fillOpacity={.16} strokeWidth={2}/><Radar name="Character" dataKey="Character" stroke="var(--accent)" fill="var(--accent)" fillOpacity={.12} strokeWidth={2}/></RadarChart></ResponsiveContainer></div>;
}
