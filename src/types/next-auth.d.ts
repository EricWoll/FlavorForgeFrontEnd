import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        userId: string;
        username: string;
        email: string;
        imageId: string;
        role: string;
        accessToken: string;
        refreshToken: string;
    }

    interface Session {
        user: User; // Ensure session includes custom user fields
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        userId: string;
        username: string;
        email: string;
        imageId: string;
        role: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
    }
}
