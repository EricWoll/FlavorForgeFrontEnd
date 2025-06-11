export type UserRole = 'ANON' | 'FREE' | 'PRO' | 'PREMIUM';

export interface TokenInfo {
    userId: string;
    userRole: UserRole;
    username: string;
    userEmail: string;
    userIsVerified: boolean;
    isAuthenticated: boolean;
}
