import type { Metadata } from 'next';
import './globals.css';

import { getServerSession } from 'next-auth';
import ClientSessionProvider from '@/contexts/session.Provider';
import { UserProvider } from '@/contexts/User.context';
import { authOptions } from '@/utils/authOptions';

import Header from '@/components/header.component';
import Footer from '@/components/footer.component';
import { SearchProvider } from '@/contexts/search.context';
import { NavBarProvider } from '@/contexts/navbar.context';
import NavBar from '@/components/navbar/container.navbar.component';

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
            <UserProvider>
                <NavBarProvider>
                    <SearchProvider>
                        <html lang="en">
                            <body className="min-h-screen flex flex-col gap-x-2 bg-body-background font-roboto bg-tinted_gray_700">
                                <Header />
                                <main className="flex flex-nowrap grow m-2 gap-6">
                                    <NavBar />
                                    {children}
                                </main>
                                <Footer />
                            </body>
                        </html>
                    </SearchProvider>
                </NavBarProvider>
            </UserProvider>
        </ClientSessionProvider>
    );
}
