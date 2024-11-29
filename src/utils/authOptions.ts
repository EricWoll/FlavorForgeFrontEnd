import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { apiPost, apiRefreshToken } from './fetchHelpers';
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

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
        console.error('Error refreshing token', e);
        return { ...token, error: 'RefreshAccessTokenError' };
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
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
            async authorize(credentials) {
                if (!credentials) throw new Error('Missing credentials');

                const res = await apiPost('auth/login', credentials);
                const user = await res.json();
                // console.log(user);
                if (res.ok && user) {
                    return {
                        id: user.id,
                        userId: user.userId, // Added this explicitly for clarity
                        username: user.username,
                        email: user.email,
                        imageId: user.imageId,
                        role: user.role,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.userId;
            session.user.name = token.username;
            session.user.image = token.imageId;
            session.user.email = token.email;
            session.user.role = token.role;
            session.user.accessToken = token.accessToken;

            return session;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            // On initial login, add user data to token
            if (user) {
                const newToken = {
                    ...token,
                    id: user.userId,
                    userId: user.userId,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    imageId: user.imageId,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: Date.now() + 60 * 60 * 1000, // Set expiration (1 hour for example)
                };
                return newToken;
            }

            // Return existing token if still valid
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Token expired, refresh it
            return await refreshAccessToken(token);
        },
    },
};
