import { CollectionDashboard } from '@/components/collection-dashboard';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
export const metadata = { title: 'My collection', description: 'Browse your saved GitScout character matches.' };
export default function DashboardPage() { return <><SiteHeader /><CollectionDashboard /><SiteFooter /></>; }
