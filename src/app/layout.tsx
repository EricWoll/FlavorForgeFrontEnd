import type { Metadata } from 'next';
import './globals.css';

import { getServerSession } from 'next-auth';
import ClientSessionProvider from '@/contexts/Providers';
import { NavBarProvider } from '@/contexts/NavBar.context';
import NavBar from '@/components/Navigation/navBar.component';

export const metadata: Metadata = {
    title: 'Flavor Forge',
    applicationName: 'FlavorForge',
    description: 'A place for you to find and store food recipes!',
    generator: 'NextJs',
    keywords: ['recipe', 'food', 'chef'],
    icons: null,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <ClientSessionProvider session={session}>
            <NavBarProvider>
                <html lang="en">
                    <body className="min-h-screen flex flex-col">
                        <header>
                            <p>Header</p>
                        </header>
                        <main className="flex flex-nowrap grow">
                            <NavBar />
                            {children}
                        </main>
                        <footer>
                            <p>Footer</p>
                        </footer>
                    </body>
                </html>
            </NavBarProvider>
        </ClientSessionProvider>
    );
}
