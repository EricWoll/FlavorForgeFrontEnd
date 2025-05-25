'use client';

import { useNavBarContext } from '@/features/navbar/contexts/navbar.context';
import { useUserContext } from '@/contexts/User.context';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import MenuIcon from '@/components/svg/menuIcon.svg.component';
import { HomeIcon, NotebookIcon, ContactIcon } from 'lucide-react';
import NavItem from './item.navbar.component';
import { useMemo } from 'react';

export default function NavBar() {
    const { navMode, setNavMode, isLoggedIn, isMobile } = useNavBarContext();
    const { user } = useUserContext();

    const isDrawerOpen = navMode !== 'collapsed';

    const navItems = useMemo(() => {
        return [
            {
                href: '/',
                icon: <HomeIcon className="w-6 h-6 shrink-0" />,
                displayText: 'Home',
                isShown: true,
                userId: undefined,
            },
            {
                href: user?.id ? `/user?id=${user.id}` : '/',
                icon: <NotebookIcon className="w-6 h-6 shrink-0" />,
                displayText: 'My Recipes',
                isShown: isLoggedIn && Boolean(user?.id),
                userId: user?.id,
            },
            {
                href: '/user/followed',
                icon: <ContactIcon className="w-6 h-6 shrink-0" />,
                displayText: 'Followed Creators',
                isShown: isLoggedIn,
                userId: user?.id,
            },
        ];
    }, [user?.id, isLoggedIn]);

    if (isMobile) {
        return (
            <Sheet
                open={isDrawerOpen}
                onOpenChange={(open) =>
                    setNavMode(open ? 'expanded' : 'collapsed')
                }
            >
                <SheetContent
                    side="left"
                    className="bg-tinted_gray_700"
                    aria-describedby={undefined}
                >
                    <SheetHeader>
                        <SheetTitle>Navbar</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-2 mt-5">
                        {navItems.map(
                            ({ href, icon, displayText, isShown, userId }) =>
                                isShown ? (
                                    <NavItem
                                        key={displayText}
                                        href={href}
                                        icon={icon}
                                        displayText={displayText}
                                        onClick={() => setNavMode('collapsed')}
                                        isCenter
                                    />
                                ) : null
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    if (navMode === 'collapsed') return null;

    const isIconOnly = navMode === 'icons';

    return (
        <nav className="sticky top-14 min-w-fit bg-tinted_gray_800 p-2 border-r border-tinted_gray_600/50 self-start h-[calc(100vh-4rem)] overflow-hidden">
            {navItems.map(({ href, icon, displayText, isShown }) =>
                isShown ? (
                    <NavItem
                        key={displayText}
                        href={href}
                        icon={icon}
                        displayText={displayText}
                        isIconOnly={isIconOnly}
                        textSize="xs"
                        textNoWrap
                    />
                ) : null
            )}
        </nav>
    );
}
