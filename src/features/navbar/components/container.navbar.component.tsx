'use client';

import { useNavBarContext } from '@/features/navbar/contexts/navbar.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import NavItem from './item.navbar.component';
import UserIcon from '@/components/svg/userIcon.svg.component';
import { useUserContext } from '@/contexts/User.context';

export default function NavBar() {
    const NavBarContext = useNavBarContext();
    const Window = useWindow();
    const User = useUserContext();

    return (
        <nav
            className={`flex flex-col gap-1
              ${
                  NavBarContext.isNavOpen &&
                  Window.windowSize.match(WindowSizes.SMALL) &&
                  ' absolute z-10 bg-tinted_gray_700 w-screen right-1 py-2 top-12 shadow-sm'
              } ${
                !NavBarContext.isNavOpen &&
                Window.windowSize.match(WindowSizes.SMALL) &&
                'hidden'
            }`}
        >
            <NavItem href="/">
                <UserIcon className={`w-6 h-6`} />
                <p className="text-xs">Home</p>
            </NavItem>
            <NavItem href="/user/profile">
                <UserIcon className={`w-6 h-6`} />
                <p className="text-xs">Profile</p>
            </NavItem>
            {NavBarContext.isLoggedIn && (
                <NavItem href={`/creator/${User.user?.id}`}>
                    <UserIcon className={`w-6 h-6`} />
                    <p className="text-xs">My Recipes</p>
                </NavItem>
            )}
        </nav>
    );
}
