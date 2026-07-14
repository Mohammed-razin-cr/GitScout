import { generateText, Output } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { demoMatch, matchSchema, traitKeys, traitLabels, universes } from '@/lib/characters';
const requestSchema = z.object({ universe: z.enum(universes), traits: z.object({ courage: z.number().min(0).max(100), intelligence: z.number().min(0).max(100), loyalty: z.number().min(0).max(100), leadership: z.number().min(0).max(100), empathy: z.number().min(0).max(100), humor: z.number().min(0).max(100) }) });
export async function POST(request) {
    const body = await request.json();
    try {
        const input = requestSchema.parse(body);
        const traitSummary = traitKeys.map((key) => `${traitLabels[key]}: ${input.traits[key]}/100`).join(', ');
        const { output } = await generateText({
            model: 'google/gemini-3.1-flash-lite',
            output: Output.object({ schema: matchSchema, name: 'character_match', description: 'A thoughtful fictional character personality match.' }),
            instructions: `You are GitScout's character-match assistant. Match the user to one recognizable fictional character from the requested universe. Use established characterization, avoid sensitive inferences, never diagnose, and explain the match warmly. The universe field must exactly equal ${input.universe}. Keep the explanation specific to the trait scores. Similar characters can come from any supported universe. Do not use copyrighted quotes verbatim; generate an original card quote.`,
            prompt: `Universe: ${input.universe}. User traits: ${traitSummary}. Return the best character match and all requested analysis fields.`,
        });
        return NextResponse.json(output);
    }
    catch (error) {
        console.error('[v0] Character match generation failed:', error);
        try {
            const input = requestSchema.parse(body);
            const names = { Marvel: 'Peter Parker', DC: 'Barbara Gordon', Anime: 'Izuku Midoriya', 'Star Wars': 'Ahsoka Tano', 'Harry Potter': 'Hermione Granger', Gaming: 'Zelda' };
            return NextResponse.json({ ...demoMatch, characterName: names[input.universe], universe: input.universe, characterTraits: input.traits, matchPercentage: 88, tagline: 'Your traits form a rare heroic pattern.', explanation: `Your strongest qualities—${traitKeys.sort((a, b) => input.traits[b] - input.traits[a]).slice(0, 3).map((key) => traitLabels[key].toLowerCase()).join(', ')}—align with ${names[input.universe]}. You approach challenges with a distinctive balance of conviction and care, making this a natural match within the ${input.universe} universe.` });
        }
        catch {
            return NextResponse.json({ error: 'The character match could not be created. Please try again.' }, { status: 500 });
        }
    }
}
