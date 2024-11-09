'use client';
import { INavBarContext } from '@/types/iNavBarContext';
import React, { createContext, useEffect, useState } from 'react';

export const NavBarContext = createContext<INavBarContext>({
    isNavOpen: true,
    setIsNavOpen: () => {},
    isWindowLarge: true,
});

export const NavBarProvider = ({ children }: { children: React.ReactNode }) => {
    const MaxSmallWindowWidth = 640;
    const MaxMediumWindowWidth = 1000;

    const [isNavOpen, setIsNavOpen] = useState(false);

    const [isWindowLarge, setIsWindowLarge] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth > MaxSmallWindowWidth
                ? setIsWindowLarge(true)
                : setIsWindowLarge(false);

            MaxSmallWindowWidth > window.innerWidth ||
            MaxMediumWindowWidth > window.innerWidth
                ? setIsNavOpen(false)
                : setIsNavOpen(true);
        };

        handleResize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const value = { isNavOpen, setIsNavOpen, isWindowLarge, setIsWindowLarge };

    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
};
