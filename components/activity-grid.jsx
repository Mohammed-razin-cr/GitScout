export function ActivityGrid({ events }) {
    const activeDays = new Map(events.map((event) => [new Date(event.createdAt).toDateString(), true]));
    const days = Array.from({ length: 84 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (83 - index)); return date; });
    return <div><div className="grid grid-flow-col grid-rows-7 gap-1" aria-label="Recent public GitHub activity grid">{days.map((day) => { const active = activeDays.has(day.toDateString()); return <span key={day.toISOString()} title={`${day.toLocaleDateString()}: ${active ? 'Public activity' : 'No public activity'}`} className={`aspect-square min-w-2 rounded-[3px] border ${active ? 'border-primary/40 bg-primary/75' : 'border-primary/10 bg-primary/5'}`}/>; })}</div><div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><span>12 weeks ago</span><span>Today</span></div></div>;
}
