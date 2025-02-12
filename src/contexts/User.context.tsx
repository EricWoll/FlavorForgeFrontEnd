'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface IUserContext {
    user: UserContextPublic | null;
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
    const [user, setUser] = useState<UserContextPublic | null>(null);

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const { id, name, email, imageId, role, accessToken } =
                session.user;

            setUser({
                id: id ?? '',
                name: name ?? '',
                email: email ?? '',
                image: imageId ?? 'none',
                role: role ?? '',
                token: accessToken ?? '',
            });
        } else if (status === 'unauthenticated') {
            setUser(null);
        }
    }, [status, session]);

    const value = {
        user,
        loading: status === 'loading',
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// Custom Hook for Consuming UserContext
export const useUserContext = (): IUserContext => useContext(UserContext);
