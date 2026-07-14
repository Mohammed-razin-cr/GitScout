import { notFound } from 'next/navigation';
import { CardCountTracker } from '@/components/card-count-tracker';
import { PlayerDashboard } from '@/components/player-dashboard';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getDeveloper } from '@/lib/github';
export async function generateMetadata({ params }) {
    const { username } = await params;
    return { title: `${username} developer card`, description: `GitScout profile card and repository summary for ${username}.` };
}
export default async function PlayerPage({ params }) {
    const { username } = await params;
    const developer = await getDeveloper(username);
    if (!developer)
        notFound();
    return <><CardCountTracker username={developer.login}/><SiteHeader /><PlayerDashboard developer={developer}/><SiteFooter /></>;
}
