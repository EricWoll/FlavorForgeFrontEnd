import type { Metadata } from 'next';
import './globals.css';

import { getServerSession } from 'next-auth';
import ClientSessionProvider from '@/contexts/session.Provider';
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
                <html lang="en">
                    <body className="bg-body-background font-roboto bg-tinted_gray_700">
                        <main>{children}</main>
                    </body>
                </html>
            </UserProvider>
        </ClientSessionProvider>
    );
}
