import type { Metadata } from 'next';
import './globals.css';

import { getServerSession } from 'next-auth';
import ClientSessionProvider from '@/contexts/session.Provider';
import { UserProvider } from '@/contexts/User.context';
import { authOptions } from '@/utils/authOptions';

import Header from '@/app/header.component';
import Footer from '@/app/footer.component';
import { SearchProvider } from '@/contexts/search.context';
import { NavBarProvider } from '@/features/navbar/contexts/navbar.context';
import QueryClientWrapper from '@/contexts/queryClient.Provider';
import NavBar from '@/features/navbar/components/container.navbar.component';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Flavor Forge',
    applicationName: 'FlavorForge',
    description: 'A place for you to find and store food recipes!',
    generator: 'NextJs',
    keywords: ['recipe', 'food', 'chef'],
    icons: null,
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({
    children,
}: RootLayoutProps): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);

    return (
        <ClientSessionProvider session={session}>
            <QueryClientWrapper>
                <UserProvider>
                    <NavBarProvider>
                        <SearchProvider>
                            <html lang="en">
                                <head>
                                    {/* Google AdSense script */}
                                    <meta
                                        name="google-adsense-account"
                                        content={
                                            process.env
                                                .NEXT_PUBLIC_ADSENSE_CLIENT
                                        }
                                    ></meta>
                                    <Script
                                        id="adsense-script"
                                        strategy="afterInteractive"
                                        async
                                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
                                        crossOrigin="anonymous"
                                    />
                                </head>
                                <body className="min-h-screen flex flex-col font-roboto bg-tinted_gray_700">
                                    <Header />
                                    <main className="flex flex-grow mt-2 gap-2 min-h-0 overflow-visible">
                                        <NavBar />
                                        {children}
                                    </main>
                                </body>
                            </html>
                        </SearchProvider>
                    </NavBarProvider>
                </UserProvider>
            </QueryClientWrapper>
        </ClientSessionProvider>
    );
}
