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
import { ContactIcon, HomeIcon, NotebookIcon } from 'lucide-react';

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
                        icon={
                            <HomeIcon
                                className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                stroke="currentColor"
                            />
                        }
                        displayText="Home"
                        isIconOnly={!isNavOpen}
                        textColor="text-tinted_gray_300"
                    />
                    <NavItem
                        href={user?.id ? `/user?id=${user.id}` : '/'}
                        icon={
                            <NotebookIcon
                                className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                stroke="currentColor"
                            />
                        }
                        displayText="My Recipes"
                        isShown={isLoggedIn}
                        isIconOnly={!isNavOpen}
                        textColor="text-tinted_gray_300"
                        textSize="xs"
                        textNoWrap
                    />
                    <NavItem
                        href="/user/followed"
                        icon={
                            <ContactIcon
                                className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                stroke="currentColor"
                            />
                        }
                        displayText="Followed Creators"
                        isIconOnly={!isNavOpen}
                        textColor="text-tinted_gray_300"
                        textSize="xs"
                        textNoWrap
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
