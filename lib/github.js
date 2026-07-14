const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'GitScout',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};
const clamp = (value) => Math.max(40, Math.min(99, Math.round(value)));

const fallbackDevelopers = {
    'mohammed-razin-cr': {
        login: 'Mohammed-razin-cr',
        name: 'Mohammed Razin CR',
        avatar: 'https://avatars.githubusercontent.com/u/153722372?v=4',
        bio: 'Half developer, half wizard ❤️ MCA Student from Bangalore University',
        location: 'Bengaluru',
        company: 'Independent',
        website: 'https://mohammed-razin-cr.me/',
        followers: 82,
        following: 42,
        publicRepos: 27,
        joined: '2023-12-13T09:31:22Z',
        stars: 214,
        forks: 2,
        totalSize: 0,
        languages: [
            { name: 'TypeScript', value: 42 },
            { name: 'Python', value: 24 },
            { name: 'JavaScript', value: 18 },
            { name: 'Go', value: 10 },
            { name: 'CSS', value: 6 },
        ],
        repos: [],
        events: [],
        rating: 86,
        role: 'Open-source ace',
        attributes: [
            { label: 'Impact', value: 91 },
            { label: 'Shipping', value: 88 },
            { label: 'Craft', value: 99 },
            { label: 'Community', value: 70 },
            { label: 'Consistency', value: 74 },
            { label: 'Range', value: 96 },
        ],
    },
};

async function fetchGitHub(url, options) {
    try {
        return await fetch(url, options);
    } catch {
        return null;
    }
}

export async function getDeveloper(username) {
    const clean = username.trim().replace(/^@/, '');
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(clean))
        return null;
    const fallback = fallbackDevelopers[clean.toLowerCase()];
    const options = { headers, next: { revalidate: 900 } };
    const [userRes, repoRes, eventRes] = await Promise.all([
        fetchGitHub(`https://api.github.com/users/${clean}`, options),
        fetchGitHub(`https://api.github.com/users/${clean}/repos?sort=updated&per_page=100`, options),
        fetchGitHub(`https://api.github.com/users/${clean}/events/public?per_page=30`, options),
    ]);
    if (!userRes || userRes.status === 404)
        return fallback ?? null;
    if (!userRes.ok)
        return fallback ?? null;
    const user = (await userRes.json());
    const rawRepos = repoRes.ok ? (await repoRes.json()) : [];
    const events = eventRes.ok ? (await eventRes.json()) : [];
    const sourceRepos = rawRepos.filter((repo) => !repo.fork);
    const stars = sourceRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const forks = sourceRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const totalSize = sourceRepos.reduce((sum, repo) => sum + repo.size, 0);
    const languageMap = new Map();
    sourceRepos.forEach((repo) => repo.language && languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + Math.max(repo.size, 1)));
    const languages = [...languageMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));
    const years = Math.max(1, (Date.now() - new Date(user.created_at).getTime()) / 31_556_952_000);
    const impact = clamp(45 + Math.log10(stars + 1) * 13 + Math.log10(user.followers + 1) * 8);
    const shipping = clamp(48 + Math.log10(sourceRepos.length + 1) * 18 + Math.min(events.length, 30) * 0.5);
    const craft = clamp(50 + Math.log10(totalSize + 1) * 7 + languages.length * 2);
    const community = clamp(44 + Math.log10(user.followers + 1) * 12 + Math.log10(forks + 1) * 7);
    const consistency = clamp(52 + Math.min(years, 12) * 2.3 + Math.min(events.length, 25) * 0.65);
    const range = clamp(50 + languages.length * 7 + Math.log10(sourceRepos.length + 1) * 8);
    const attributes = [
        { label: 'Impact', value: impact }, { label: 'Shipping', value: shipping }, { label: 'Craft', value: craft },
        { label: 'Community', value: community }, { label: 'Consistency', value: consistency }, { label: 'Range', value: range },
    ];
    const rating = clamp(attributes.reduce((sum, item) => sum + item.value, 0) / attributes.length);
    const role = impact >= 85 ? 'Open-source ace' : shipping >= craft ? 'Product engine' : community >= 75 ? 'Community lead' : 'Code architect';
    return {
        login: user.login, name: user.name || user.login, avatar: user.avatar_url, bio: user.bio || 'Building in public, one commit at a time.',
        location: user.location || 'Remote', company: user.company || 'Independent', website: user.blog, followers: user.followers, following: user.following,
        publicRepos: user.public_repos, joined: user.created_at, stars, forks, totalSize, languages,
        repos: sourceRepos.slice(0, 6).map((repo) => ({ name: repo.name, description: repo.description || 'No description provided.', language: repo.language || 'Code', stars: repo.stargazers_count, forks: repo.forks_count, url: repo.html_url, updatedAt: repo.updated_at })),
        events: events.slice(0, 8).map((event) => ({ type: event.type.replace('Event', ''), repo: event.repo.name.split('/').pop() || event.repo.name, createdAt: event.created_at })),
        rating, role, attributes,
    };
}
export const featuredUsers = ['torvalds', 'sindresorhus', 'addyosmani', 'cassidoo', 'gaearon', 'kentcdodds'];
export function compactNumber(value) {
    return new Intl.NumberFormat('en', { notation: value > 999 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(value);
}
