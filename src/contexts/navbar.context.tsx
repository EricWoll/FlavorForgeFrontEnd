'use client';

import useWindow, {
    MaxMediumWindowWidth,
    MaxSmallWindowWidth,
    WindowSizes,
    WindowSizesType,
} from '@/hooks/useWindow.hook';
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
}

const defaultNavBarContext: INavBarContext = {
    isNavOpen: false,
    setIsNavOpen: () => {},
};

export const NavBarContext =
    createContext<INavBarContext>(defaultNavBarContext);

export const NavBarProvider = ({
    children,
}: {
    children: ReactNode;
}): React.JSX.Element => {
    const Window = useWindow();

    const [isNavOpen, setIsNavOpen] = useState<boolean>(true);

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
    };

    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBarContext = (): INavBarContext => useContext(NavBarContext);
