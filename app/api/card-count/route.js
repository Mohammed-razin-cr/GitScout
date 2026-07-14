import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

const counterName = 'cards_rated';
const noStoreHeaders = { 'Cache-Control': 'no-store, max-age=0' };

async function getDatabase() {
    const { env } = await getCloudflareContext({ async: true });
    return env.DB;
}

async function ensureCounter(database) {
    await database.batch([
        database.prepare('CREATE TABLE IF NOT EXISTS app_counters (name TEXT PRIMARY KEY, value INTEGER NOT NULL DEFAULT 0)'),
        database.prepare('INSERT OR IGNORE INTO app_counters (name, value) VALUES (?, 0)').bind(counterName),
    ]);
}

async function getCount(database) {
    const row = await database.prepare('SELECT value FROM app_counters WHERE name = ?').bind(counterName).first();
    return Number(row?.value ?? 0);
}

function databaseError(error) {
    console.error('[GitScout] Card count database error:', error);
    return NextResponse.json({ error: 'The card count is temporarily unavailable.' }, { status: 503, headers: noStoreHeaders });
}

export async function GET() {
    try {
        const database = await getDatabase();
        await ensureCounter(database);
        return NextResponse.json({ count: await getCount(database) }, { headers: noStoreHeaders });
    }
    catch (error) {
        return databaseError(error);
    }
}

export async function POST() {
    try {
        const database = await getDatabase();
        await ensureCounter(database);
        await database.prepare('UPDATE app_counters SET value = value + 1 WHERE name = ?').bind(counterName).run();
        return NextResponse.json({ count: await getCount(database) }, { headers: noStoreHeaders });
    }
    catch (error) {
        return databaseError(error);
    }
}
