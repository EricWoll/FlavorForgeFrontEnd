import type { Metadata } from 'next';
import './globals.css';

import { getServerSession } from 'next-auth';
import ClientSessionProvider from '@/contexts/Providers';
import { NavBarProvider } from '@/contexts/NavBar.context';
import NavBar from '@/components/Navigation/navBar.component';
import Header from '@/components/header.component';
import Footer from '@/components/footer.component';
import { UserProvider } from '@/contexts/User.context';
import { authOptions } from '@/utils/authOptions';

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
                    <html lang="en">
                        <body className="min-h-screen flex flex-col mx-4 bg-grayscale-1_000 gap-x-2">
                            <Header />
                            <main className="flex flex-nowrap grow">
                                <NavBar />
                                {children}
                            </main>
                            <Footer />
                        </body>
                    </html>
                </NavBarProvider>
            </UserProvider>
        </ClientSessionProvider>
    );
}
