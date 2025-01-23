'use client';

import { useNavBarContext } from '@/contexts/navbar.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import NavItem from './navItem.component';

import UserIcon from '@/svgs/icon-user.svg';

export default function NavBar() {
    const NavBarContext = useNavBarContext();
    const Window = useWindow();

    return (
        <nav
            className={`gap-2
              ${
                  NavBarContext.isNavOpen &&
                  Window.windowSize.match(WindowSizes.SMALL) &&
                  ' absolute z-10 bg-tinted_gray_700 w-screen py-1 left-[-1rem] shadow-sm'
              }`}
        >
            <NavItem>
                <UserIcon viewBox="0 0 24 24" className={`w-6 h-6`} />
                <p>Profile</p>
            </NavItem>
        </nav>
    );
}
