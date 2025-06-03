import type { Metadata } from 'next';
import './globals.css';

import { SearchProvider } from '@/features/searchbar/context/search.context';
import QueryClientWrapper from '@/contexts/queryClient.Provider';
import Script from 'next/script';

import { ClerkProvider } from '@clerk/nextjs';
import { SidebarNav } from '@/features/navbar/component/navbar.sidebar.component';
import SearchBar from '@/features/searchbar/component/searchbar';
import { ThemeProvider } from 'next-themes';
import Header from '@/features/header/components/header.component';

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
                        <body className="min-h-screen w-full flex flex-row font-roboto bg-tinted_gray_700 p-0 m-0 ">
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                            >
                                <SidebarNav />
                                <main className="w-full h-full flex flex-col gap-4 p-0 m-0 mt-4">
                                    <SearchBar />
                                    <Header />
                                    {children}
                                </main>
                            </ThemeProvider>
                        </body>
                    </html>
                </SearchProvider>
            </QueryClientWrapper>
        </ClerkProvider>
    );
}
