'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface IUserContextPublic {
    userId: string;
    username: string;
    email: string;
    imageId: string;
    role: string;
    token: string;
}

interface IUserContext {
    user: IUserContextPublic | null;
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
    const { data: session, status } = useSession();
    const [user, setUser] = useState<IUserContextPublic | null>(null);

    console.log('User Provider Reloaded', { status, session });

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUser({
                userId: session.user.userId ?? '',
                username: session.user.username ?? '',
                email: session.user.email ?? '',
                imageId: session.user.imageId ?? 'none',
                role: session.user.role ?? '',
                token: session.user.accessToken ?? '',
            });
        } else if (status === 'unauthenticated') {
            setUser(null); // Clear user if unauthenticated
        }
    }, [status, session?.user]);

    const value = {
        user,
        loading: status === 'loading',
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// Custom Hook for Consuming UserContext
export const useUserContext = () => useContext(UserContext);
