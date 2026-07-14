# GitScout

GitScout turns a public GitHub profile into a clean developer card, profile page, and comparison view. It is built around public profile data: repositories, languages, stars, forks, followers, and recent activity.

The featured profile in this project is [Mohammed Razin CR](https://github.com/Mohammed-razin-cr).

## What It Does

- Builds a shareable card for any public GitHub username.
- Shows repository, language, activity, and profile summary data.
- Compares two GitHub profiles side by side.
- Includes a sample leaderboard and optional character-match view.
- Uses a calmer product voice and real project examples instead of placeholder marketing copy.

## Tech Stack

- Next.js 16
- React 19
- JavaScript / JSX
- Tailwind CSS
- Base UI components
- Recharts
- GitHub REST API
- Cloudflare D1 (shared cards-rated counter)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open `http://127.0.0.1:3000` in your browser.

Build for production:

```bash
pnpm build
```

## GitHub API

GitScout works without a token, but unauthenticated GitHub API requests are rate-limited. For heavier usage, add one token or a comma-separated backup pool:

```bash
GITHUB_TOKEN=your_token_here
GITHUB_TOKENS=backup_token_1,backup_token_2,backup_token_3
```

`GITHUB_TOKEN` is still supported for a single account. `GITHUB_TOKENS` lets the app rotate requests and retry with another token when GitHub returns rate-limit responses.

## Shared card counter

The `cards rated` number is stored in Cloudflare D1, not in browser storage. The production Worker uses a D1 binding named `DB` that points to the `gitscout-counter` database. The schema is included in [migrations/0001_card_count.sql](migrations/0001_card_count.sql).

For another Cloudflare environment, create a D1 database, bind it to the Worker as `DB`, and run that migration before deploying.

## Project Notes

- The homepage highlights Mohammed Razin CR and links to real repositories from the public GitHub profile.
- The visual direction is inspired by fast, card-first rating sites such as GitFut, while keeping GitScout's own copy, data model, and brand.
- The scoring is a lightweight summary for browsing, not a hiring decision.
- Only public GitHub data is requested.
