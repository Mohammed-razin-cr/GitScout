'use client';
const sections = [
    ['overview', 'Overview'],
    ['repositories', 'Repositories'],
    ['analytics', 'Analytics'],
    ['developer-card', 'Developer Card'],
    ['character-match', 'Character Match'],
];
export function ProfileSectionNav() {
    return <nav aria-label="Profile sections" className="sticky top-20 z-40 overflow-x-auto border-y border-primary/10 bg-background/80 backdrop-blur-xl"><div className="mx-auto flex w-max min-w-full max-w-7xl items-center px-4 py-3 font-mono text-xs font-semibold sm:px-6 lg:px-8">{sections.map(([id, label], index) => <span key={id} className="flex items-center"><a href={`#${id}`} className="whitespace-nowrap text-muted-foreground transition-colors hover:text-primary">{label}</a>{index < sections.length - 1 && <span aria-hidden="true" className="px-2 text-primary">|</span>}</span>)}</div></nav>;
}
