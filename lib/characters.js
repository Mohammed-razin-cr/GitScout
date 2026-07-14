import { z } from 'zod';
export const universes = ['Marvel', 'DC', 'Anime', 'Star Wars', 'Harry Potter', 'Gaming'];
export const traitKeys = ['courage', 'intelligence', 'loyalty', 'leadership', 'empathy', 'humor'];
export const universeMeta = {
    Marvel: { short: 'MV', color: '#dc2638' }, DC: { short: 'DC', color: '#d8aa49' }, Anime: { short: 'AN', color: '#e34d63' },
    'Star Wars': { short: 'SW', color: '#d4b35d' }, 'Harry Potter': { short: 'HP', color: '#b7293d' }, Gaming: { short: 'GM', color: '#e1b85b' },
};
export const matchSchema = z.object({
    characterName: z.string().min(2).max(60), universe: z.enum(universes), matchPercentage: z.number().min(60).max(100), archetype: z.string().min(2).max(60),
    tagline: z.string().min(8).max(120), explanation: z.string().min(40).max(700), strengths: z.array(z.string().min(2).max(50)).min(3).max(5),
    growthAreas: z.array(z.string().min(2).max(60)).min(1).max(3), similarCharacters: z.array(z.string().min(2).max(60)).min(3).max(4), quote: z.string().min(8).max(160),
    characterTraits: z.object({ courage: z.number().min(0).max(100), intelligence: z.number().min(0).max(100), loyalty: z.number().min(0).max(100), leadership: z.number().min(0).max(100), empathy: z.number().min(0).max(100), humor: z.number().min(0).max(100) }),
});
export const defaultTraits = { courage: 72, intelligence: 80, loyalty: 85, leadership: 64, empathy: 76, humor: 58 };
export const traitLabels = { courage: 'Courage', intelligence: 'Intelligence', loyalty: 'Loyalty', leadership: 'Leadership', empathy: 'Empathy', humor: 'Humor' };
export const demoMatch = {
    characterName: 'Peter Parker', universe: 'Marvel', matchPercentage: 92, archetype: 'The Reluctant Hero', tagline: 'Great power, grounded heart.',
    explanation: 'Your sharp mind and deep sense of loyalty point to someone who solves difficult problems without losing sight of the people affected by them. Like Peter Parker, you balance courage with empathy and use humor to keep pressure from defining you.',
    strengths: ['Quick thinking', 'Protective loyalty', 'Resilient optimism'], growthAreas: ['Trust others with the burden'], similarCharacters: ['Miles Morales', 'Ahsoka Tano', 'Hermione Granger'], quote: 'The choices we make define the hero we become.',
    characterTraits: { courage: 86, intelligence: 88, loyalty: 91, leadership: 68, empathy: 84, humor: 75 },
};
export function initials(name) { return name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase(); }
export function formatDate(value) { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)); }
