import { User } from '@clerk/nextjs/server';

export type UserWithRole = User & {
    publicMetadata: {
        role?: string;
    };
};
