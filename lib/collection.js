'use client';
const KEY = 'characterforge.matches.v1';
export function getMatches() { if (typeof window === 'undefined')
    return []; try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
}
catch {
    return [];
} }
export function saveMatch(match, traits) { const item = { ...match, traits, id: crypto.randomUUID(), createdAt: new Date().toISOString(), favorite: false }; localStorage.setItem(KEY, JSON.stringify([item, ...getMatches()].slice(0, 50))); window.dispatchEvent(new Event('characterforge:updated')); return item; }
export function toggleFavorite(id) { const items = getMatches().map((item) => item.id === id ? { ...item, favorite: !item.favorite } : item); localStorage.setItem(KEY, JSON.stringify(items)); window.dispatchEvent(new Event('characterforge:updated')); return items; }
export function removeMatch(id) { const items = getMatches().filter((item) => item.id !== id); localStorage.setItem(KEY, JSON.stringify(items)); window.dispatchEvent(new Event('characterforge:updated')); return items; }
export function clearMatches() { localStorage.removeItem(KEY); window.dispatchEvent(new Event('characterforge:updated')); }
