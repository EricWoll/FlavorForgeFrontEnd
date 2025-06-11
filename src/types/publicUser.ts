export type PublicUser = {
    userId: string;
    username: string;
    email: string | undefined;
    imageUrl: string;
    role: string;
    followerCount?: number;
    aboutText?: string;
    followed?: boolean;
};
