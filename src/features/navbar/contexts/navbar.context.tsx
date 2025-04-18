'use client';

import useWindow, {
    MaxMediumWindowWidth,
    MaxSmallWindowWidth,
    WindowSizes,
    WindowSizesType,
} from '@/hooks/useWindow.hook';
import { Session } from 'next-auth';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

export interface INavBarContext {
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
}

const defaultNavBarContext: INavBarContext = {
    isNavOpen: false,
    setIsNavOpen: () => {},
    isLoggedIn: false,
};

export const NavBarContext =
    createContext<INavBarContext>(defaultNavBarContext);

export const NavBarProvider = ({
    children,
    session,
}: {
    children: ReactNode;
    session: Session | null | undefined;
}): React.JSX.Element => {
    const Window = useWindow();

    const [isNavOpen, setIsNavOpen] = useState<boolean>(true);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        session?.user.id ? true : false
    );

    useEffect(() => {
        const handleResize = () => {
            Window.windowSize.match(WindowSizes.SMALL) ||
            Window.windowSize.match(WindowSizes.MEDIUM)
                ? setIsNavOpen(false)
                : setIsNavOpen(true);
        };
        handleResize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, [Window.windowSize]);

    const value: INavBarContext = {
        isNavOpen,
        setIsNavOpen,
        isLoggedIn,
    };

    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBarContext = (): INavBarContext => useContext(NavBarContext);
