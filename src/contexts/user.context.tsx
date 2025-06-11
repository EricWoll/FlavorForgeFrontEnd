'use client';

import { PublicUser } from '@/types/publicUser';
import { TokenInfo, UserRole } from '@/types/token';
import { useAuth, useSession, useUser } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface IUserContext {
    user: PublicUser | null;
    loading: boolean;
}

const defaultUserContext: IUserContext = {
    user: null,
    loading: true,
};

export const UserContext = createContext<IUserContext>(defaultUserContext);

export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    const { session, isSignedIn, isLoaded } = useSession();
    const { user, isSignedIn: userSignedIn, isLoaded: userLoaded } = useUser();
    const { sessionClaims } = useAuth();

    const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
    const [loading, setLoading] = useState(true);

    const getFullUser = async () => {
        // Implementation for getting full user data if needed
    };

    const getUserRole = (): UserRole => {
        return (sessionClaims?.userRole as UserRole) || 'ANON';
    };

    useEffect(() => {
        // Wait for both auth and user to be loaded
        if (!isLoaded || !userLoaded) {
            setLoading(true);
            return;
        }

        // User is signed in
        if (isSignedIn && userSignedIn && user) {
            const userRole = getUserRole();

            setCurrentUser({
                userId: user.id,
                username: user.username ?? '',
                email: user.primaryEmailAddress?.emailAddress ?? '', // Fix: get the actual email string
                imageUrl: user.imageUrl,
                role: userRole,
            });
            setLoading(false);
        }
        // User is not signed in
        else if (!isSignedIn || !userSignedIn) {
            setCurrentUser(null);
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, userSignedIn, userLoaded, user, sessionClaims]);

    const value: IUserContext = {
        user: currentUser, // Fix: use currentUser instead of user
        loading,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// Custom Hook for Consuming UserContext
export const useUserContext = (): IUserContext => useContext(UserContext);
