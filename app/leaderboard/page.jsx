import { DeveloperLeaderboard } from '@/components/developer-leaderboard';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getScoutedProfiles } from '@/lib/scouted-profiles';
export const metadata = {
    title: 'Developer Leaderboard | GitScout',
    description: 'Discover the highest-rated developers in the GitScout community.',
};
export const dynamic = 'force-dynamic';
export default async function LeaderboardPage() {
    const developers = await getScoutedProfiles();
    return <><SiteHeader /><DeveloperLeaderboard developers={developers}/><SiteFooter /></>;
}
