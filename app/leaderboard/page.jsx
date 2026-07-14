import { DeveloperLeaderboard } from '@/components/developer-leaderboard';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
export const metadata = {
    title: 'Developer Leaderboard | GitScout',
    description: 'Discover the highest-rated developers in the GitScout community.',
};
export default function LeaderboardPage() {
    return <><SiteHeader /><DeveloperLeaderboard /><SiteFooter /></>;
}
