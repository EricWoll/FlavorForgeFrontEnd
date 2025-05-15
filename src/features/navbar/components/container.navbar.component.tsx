'use client';

import { useNavBarContext } from '@/features/navbar/contexts/navbar.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import NavItem from './item.navbar.component';
import UserIcon from '@/components/svg/userIcon.svg.component';
import { useUserContext } from '@/contexts/User.context';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import MenuIcon from '@/components/svg/menuIcon.svg.component';
import { useEffect, useState } from 'react';

export function NavBarLarge() {
    const Window = useWindow();
    const { isNavOpen, setIsNavOpen, isLoggedIn, isMobile } =
        useNavBarContext();
    const { user } = useUserContext();

    return (
        <>
            {!isMobile && (
                <nav>
                    <NavItem
                        href="/"
                        isCenter
                        icon={<UserIcon className="w-6 h-6" />}
                        displayText="Home"
                        isIconOnly={!isNavOpen}
                    />
                    <NavItem
                        href="/user/profile"
                        isCenter
                        icon={<UserIcon className="w-6 h-6" />}
                        displayText="Profile"
                        isIconOnly={!isNavOpen}
                    />
                    <NavItem
                        href={user?.id ? `/user?id=${user.id}` : '/user'}
                        isCenter
                        icon={<UserIcon className="w-6 h-6" />}
                        displayText="My Recipes"
                        isShown={isLoggedIn}
                        isIconOnly={!isNavOpen}
                    />
                </nav>
            )}
        </>
    );
}

export function NavBarSmall() {
    const { isNavOpen, setIsNavOpen, isLoggedIn } = useNavBarContext();
    const { user } = useUserContext();

    return (
        <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
            <SheetTrigger asChild>
                <MenuIcon
                    className="w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1"
                    onClick={() => setIsNavOpen(true)}
                />
            </SheetTrigger>
            <SheetContent side="left" className="bg-tinted_gray_700">
                <SheetHeader>
                    <SheetTitle>Navbar</SheetTitle>
                </SheetHeader>
                <div className="grid gap-2 mt-5">
                    <NavItem
                        href="/"
                        onClick={() => setIsNavOpen(false)}
                        isCenter
                        icon={<UserIcon className="w-6 h-6" />}
                        displayText="Home"
                    />
                    <NavItem
                        href="/user/profile"
                        onClick={() => setIsNavOpen(false)}
                        isCenter
                        icon={<UserIcon className="w-6 h-6" />}
                        displayText="Profile"
                    />
                    <NavItem
                        href={user?.id ? `/user?id=${user.id}` : '/user'}
                        onClick={() => setIsNavOpen(false)}
                        isCenter
                        icon={<UserIcon className="w-6 h-6" />}
                        displayText="My Recipes"
                        isShown={isLoggedIn}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
