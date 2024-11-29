import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { apiPost, apiRefreshToken } from './fetchHelpers';
import { NextAuthOptions } from 'next-auth';

async function refreshAccessToken(token: any): Promise<any> {
    try {
        const res = await apiRefreshToken(token?.refreshToken);
        if (!res.ok) {
            throw new Error('Refresh Token error');
        }

        const newTokens = await res.json();
        const decodedToken = jwtDecode(newTokens.accessToken);
        return {
            ...token,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken ?? token.refreshToken,
            accessTokenExpires: decodedToken?.exp! * 1000, // update expiration
        };
    } catch (e: any) {
        // Log the error to understand what went wrong
        console.error('Error refreshing token', e);
        return { ...token }; // Return original token if refresh fails
    }
}

export const authOptions: NextAuthOptions = {
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            },
        },
    },
    pages: {
        signIn: '/auth',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await apiPost('auth/login', credentials);
                if (!res.ok) return null;
                try {
                    const user = await res.json();
                    return { ...user };
                } catch (error) {
                    throw new Error(`Failed to Login: ${error}`);
                }
            },
        }),
    ],
    //86400
    callbacks: {
        async jwt({
            token,
            user,
            account,
        }: {
            token: any;
            user: any;
            account: any;
        }) {
            // Initial sign-in
            if (account && user) {
                return {
                    ...token,
                    userId: user.userId,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    imageId: user.imageId,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: jwtDecode(user.accessToken).exp! * 1000, // Expiration time in ms
                };
            }

            // Return existing token if it’s still valid
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token expired, refresh it
            return await refreshAccessToken(token);
        },
        async session({ session, token }: { session: any; token: any }) {
            // Merge token fields into session.user
            session.user = {
                userId: token.userId,
                username: token.username,
                email: token.email,
                role: token.role,
                imageId: token.imageId,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
            return session;
        },
    },
};
