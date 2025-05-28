'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '@/contexts/User.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';

export type NavMode = 'expanded' | 'icons' | 'collapsed';

export interface INavBarContext {
    navMode: NavMode;
    setNavMode: React.Dispatch<React.SetStateAction<NavMode>>;
    isMobile: boolean;
    isLoggedIn: boolean;
    toggleNav: () => void;
}

const defaultContext: INavBarContext = {
    navMode: 'expanded',
    setNavMode: () => {},
    isMobile: false,
    isLoggedIn: false,
    toggleNav: () => {},
};

export const NavBarContext = createContext<INavBarContext>(defaultContext);

export const NavBarProvider = ({ children }: { children: React.ReactNode }) => {
    const Window = useWindow();
    const { user, loading } = useUserContext();
    const [navMode, setNavMode] = useState<NavMode>('collapsed');
    const [isMobile, setIsMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsLoggedIn(!!user?.id);
        }
    }, [user?.id, loading]);

    useEffect(() => {
        const windowResized = () => {
            if (!Window.windowSize) return;

            const isSmall = Window.windowSize === WindowSizes.SMALL;
            const isLarge = Window.windowSize === WindowSizes.LARGE;
            setIsMobile(isSmall);
            setNavMode(isLarge ? 'expanded' : isSmall ? 'collapsed' : 'icons');
        };

        windowResized();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', windowResized);
            return () => window.removeEventListener('resize', windowResized);
        }
    }, [Window.windowSize]);

    const toggleNav = () => {
        if (isMobile) {
            setNavMode((prev) =>
                prev === 'collapsed' ? 'expanded' : 'collapsed'
            );
        } else {
            setNavMode((prev) => (prev === 'expanded' ? 'icons' : 'expanded'));
        }
    };

    const value = { navMode, setNavMode, isMobile, isLoggedIn, toggleNav };

    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBarContext = () => useContext(NavBarContext);
