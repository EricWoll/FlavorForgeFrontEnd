'use client';
import { NavBarContext } from '@/contexts/NavBar.context';
import { ReactNode, useContext } from 'react';

export default function NavButton({
    buttonText,
}: {
    buttonText: string;
}): ReactNode {
    const NavContext = useContext(NavBarContext);

    const handleNavButtonClick = () => {
        NavContext.setIsNavOpen(!NavContext.isNavOpen);
    };

    return <button onClick={handleNavButtonClick}>{buttonText}</button>;
}
