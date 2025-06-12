'use client';

import { PublicUser } from '@/types/publicUser';
import { TokenInfo, UserRole } from '@/types/token';
import { useAuth, useSession, useUser } from '@clerk/nextjs';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

interface IUserContext {
    user: PublicUser | null;
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
    getToken: () => Promise<string | null>;
}

const defaultUserContext: IUserContext = {
    user: null,
    isLoading: true,
    isAuthenticated: undefined,
    getToken: async () => null,
};

export const UserContext = createContext<IUserContext>(defaultUserContext);

export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    const { session, isSignedIn, isLoaded } = useSession();
    const { user } = useUser();
    const { sessionClaims, getToken } = useAuth();

    const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const getFullUser = async () => {
        // Implementation for getting full user data if needed
    };

    const getUserRole = (): UserRole => {
        return (sessionClaims?.userRole as UserRole) || 'ANON';
    };

    const getUserToken = async (): Promise<string | null> => {
        try {
            const token = await getToken();
            return token ? token : null;
        } catch (err) {
            setError('Failed to get token');
            return null;
        }
    };

    useEffect(() => {
        if (!isLoaded) {
            setIsLoading(true);
            return;
        }

        if (isSignedIn && user) {
            const userRole = getUserRole();

            setCurrentUser({
                userId: user.id,
                username: user.username ?? user.firstName ?? 'Anonymous',
                email: user.primaryEmailAddress?.emailAddress ?? '',
                imageUrl: user.imageUrl,
                role: userRole,
            });
        } else {
            setCurrentUser(null);
        }

        setIsLoading(false);
    }, [isLoaded, isSignedIn, user, sessionClaims]);

    const value: IUserContext = useMemo(
        () => ({
            user: currentUser,
            isLoading: isLoading,
            isAuthenticated: isSignedIn,
            getToken: getUserToken,
        }),
        [currentUser, isLoading, isSignedIn, getUserToken]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// Custom Hook for Consuming UserContext
export const useUserContext = (): IUserContext => useContext(UserContext);
