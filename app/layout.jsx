import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AmbientBackground } from '@/components/ambient-background';
import { Providers } from '@/components/providers';
import './globals.css';
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
export const metadata = {
    metadataBase: new URL('https://gitscout.me'),
    title: { default: 'GitScout - GitHub profile cards', template: '%s · GitScout' },
    description: 'Create clean, shareable developer cards from public GitHub profiles, repositories, languages, stars, and activity.',
    openGraph: {
        title: 'GitScout - GitHub profile cards',
        description: 'Create clean, shareable developer cards from public GitHub profiles.',
        url: 'https://gitscout.me',
        siteName: 'GitScout',
        type: 'website',
    },
};
export const viewport = { colorScheme: 'dark', themeColor: '#16090c', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }) {
    return <html lang="en" suppressHydrationWarning className="bg-background"><body className={`${geist.variable} ${mono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}><Providers><AmbientBackground />{children}</Providers>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>;
}
