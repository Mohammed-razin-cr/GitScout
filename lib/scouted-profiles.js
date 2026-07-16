import { getCloudflareContext } from '@opennextjs/cloudflare';

const profileTable = `CREATE TABLE IF NOT EXISTS scouted_profiles (
    login TEXT PRIMARY KEY COLLATE NOCASE,
    name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    rating INTEGER NOT NULL,
    followers INTEGER NOT NULL DEFAULT 0,
    stars INTEGER NOT NULL DEFAULT 0,
    repositories INTEGER NOT NULL DEFAULT 0,
    top_language TEXT NOT NULL DEFAULT 'Code',
    location TEXT,
    first_scanned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_scanned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const rankingIndex = 'CREATE INDEX IF NOT EXISTS idx_scouted_profiles_ranking ON scouted_profiles (rating DESC, stars DESC, followers DESC, last_scanned_at DESC)';

async function getDatabase() {
    try {
        const { env } = await getCloudflareContext({ async: true });
        return env.DB ?? null;
    }
    catch {
        return null;
    }
}

async function ensureProfileTable(database) {
    await database.batch([database.prepare(profileTable), database.prepare(rankingIndex)]);
}

function profileValues(developer) {
    return [
        developer.login,
        developer.name,
        developer.avatar,
        developer.rating,
        developer.followers,
        developer.stars,
        developer.publicRepos,
        developer.languages?.[0]?.name ?? 'Code',
        developer.location || null,
    ];
}

export async function saveScoutedProfile(developer) {
    const database = await getDatabase();
    if (!database)
        return false;
    try {
        await ensureProfileTable(database);
        await database.prepare(`INSERT INTO scouted_profiles (
            login, name, avatar, rating, followers, stars, repositories, top_language, location
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(login) DO UPDATE SET
            name = excluded.name,
            avatar = excluded.avatar,
            rating = excluded.rating,
            followers = excluded.followers,
            stars = excluded.stars,
            repositories = excluded.repositories,
            top_language = excluded.top_language,
            location = excluded.location,
            last_scanned_at = CURRENT_TIMESTAMP`).bind(...profileValues(developer)).run();
        return true;
    }
    catch (error) {
        console.error('[GitScout] Could not save scouted profile:', error);
        return false;
    }
}

export async function getScoutedProfiles(limit = 100) {
    const database = await getDatabase();
    if (!database)
        return [];
    try {
        await ensureProfileTable(database);
        const { results = [] } = await database.prepare(`SELECT
            login AS username,
            name,
            avatar,
            rating,
            followers,
            stars,
            repositories,
            top_language AS topLanguage,
            location,
            last_scanned_at AS lastScannedAt
            FROM scouted_profiles
            ORDER BY rating DESC, stars DESC, followers DESC, last_scanned_at DESC
            LIMIT ?`).bind(Math.min(Math.max(limit, 1), 250)).all();
        return results;
    }
    catch (error) {
        console.error('[GitScout] Could not load the leaderboard:', error);
        return [];
    }
}
