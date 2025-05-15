'use client';

import { useUserContext } from '@/contexts/User.context';
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
    isMobile: boolean;
    setIsMobile: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
}

const defaultNavBarContext: INavBarContext = {
    isNavOpen: false,
    setIsNavOpen: () => {},
    isMobile: false,
    setIsMobile: () => {},
    isLoggedIn: false,
};

export const NavBarContext =
    createContext<INavBarContext>(defaultNavBarContext);

export const NavBarProvider = ({
    children,
}: {
    children: ReactNode;
}): React.JSX.Element => {
    const Window = useWindow();
    const UserContext = useUserContext();

    const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(true);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        UserContext.user?.id ? true : false
    );

    useEffect(() => {
        if (UserContext.loading) return;
        setIsLoggedIn(UserContext.user?.id ? true : false);
    }, [UserContext.user?.id]);

    useEffect(() => {
        const handleResize = () => {
            if (Window.windowSize.match(WindowSizes.SMALL)) {
                setIsMobile(true);
                setIsNavOpen(false);
            } else if (Window.windowSize.match(WindowSizes.MEDIUM)) {
                setIsNavOpen(false);
                setIsMobile(false);
            } else {
                setIsNavOpen(true);
                setIsMobile(false);
            }
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
        isMobile,
        setIsMobile,
        isLoggedIn,
    };

    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBarContext = (): INavBarContext => useContext(NavBarContext);
