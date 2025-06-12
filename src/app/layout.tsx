import type { Metadata } from 'next';
import './globals.css';

import { SearchProvider } from '@/contexts/search.context';
import QueryClientWrapper from '@/contexts/queryClient.Provider';
import Script from 'next/script';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@/contexts/user.context';
import SmallNav from '@/features/navigation/components/smallNavBar.component';
import NavBar from '@/features/navigation/components/navBar.component';

export const metadata: Metadata = {
    title: 'Flavor Forge',
    applicationName: 'FlavorForge',
    description: 'A place for you to find and store food recipes!',
    generator: 'NextJs',
    keywords: ['recipe', 'food', 'chef'],
    icons: {
        icon: '/favicon.ico',
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({
    children,
}: RootLayoutProps): Promise<JSX.Element> {
    return (
        <ClerkProvider>
            <QueryClientWrapper>
                <UserProvider>
                    <SearchProvider>
                        <html lang="en" suppressHydrationWarning>
                            <head>
                                <Script
                                    id="adsense-script"
                                    strategy="afterInteractive"
                                    async
                                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
                                    crossOrigin="anonymous"
                                />
                            </head>
                            <body className="flex flex-row relative">
                                <NavBar />
                                <main className="w-full min-h-screen p-0 m-0 relative">
                                    <SmallNav />
                                    <div className="w-full flex justify-center">
                                        {children}
                                    </div>
                                </main>
                            </body>
                        </html>
                    </SearchProvider>
                </UserProvider>
            </QueryClientWrapper>
        </ClerkProvider>
    );
}
