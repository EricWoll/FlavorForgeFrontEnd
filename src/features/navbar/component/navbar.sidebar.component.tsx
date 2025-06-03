'use client';

import Link from 'next/link';
import {
    useUser,
    SignInButton,
    SignOutButton,
    UserButton,
    useSession,
} from '@clerk/nextjs';
import {
    Home,
    Menu,
    BookOpen,
    User,
    LogOut,
    LogIn,
    UserCog,
    ChevronsLeft,
    ChevronsRight,
    LucideProps,
} from 'lucide-react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.shadcn.component';
import { Skeleton } from '@/components/ui/skeleton';
import NavItem from './navItem.component';
import { getFilteredLinks, navLinks } from '../data/navLinks';
import { UserWithRole } from '@/types/userWithRole';
import { Separator } from '@/components/ui/separator';

export function SidebarNav() {
    const { isSignedIn, user, isLoaded } = useUser();

    const [collapsed, setCollapsed] = React.useState(true);

    const Window = useWindow();

    const isMobile = Window.windowSize.match(WindowSizes.SMALL);

    useEffect(() => {
        setCollapsed(Boolean(Window.windowSize.match(WindowSizes.MEDIUM)));
    }, [Window.windowSize]);

    const filteredLinks = getFilteredLinks(
        navLinks,
        isSignedIn,
        user as UserWithRole | null
    );

    if (isMobile) return null;

    if (!isLoaded) {
        return (
            <section className="flex w-fit p-4 relative">
                <aside
                    className={cn(
                        'bg-background shadow-lg transition-all duration-300 border relative flex flex-col',
                        collapsed ? 'w-16 px-2' : 'w-56 px-4',
                        'rounded-2xl',
                        'overflow-hidden', // prevent content overflow during transition
                        'sticky top-4'
                    )}
                    style={{ transitionProperty: 'width, padding' }}
                >
                    <div className="flex items-center justify-between py-2 mb-6">
                        {!collapsed && (
                            <span className="text-lg font-semibold whitespace-nowrap">
                                FlavorForge
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            color="primary"
                            size="md"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
                        </Button>
                    </div>
                    <div className="p-4 space-y-2">
                        {!collapsed ? (
                            <>
                                <Skeleton className="h-6 w-full rounded" />
                                <Skeleton className="h-6 w-full rounded" />
                                <Skeleton className="h-6 w-full rounded" />
                            </>
                        ) : (
                            <>
                                <Skeleton className="h-6 w-6 rounded" />
                                <Skeleton className="h-6 w-6 rounded" />
                                <Skeleton className="h-6 w-6 rounded" />
                            </>
                        )}
                    </div>
                </aside>
            </section>
        );
    }

    return (
        <section className="flex w-fit p-4 relative">
            <aside
                className={cn(
                    'bg-background shadow-lg transition-all duration-300 border relative flex flex-col justify-between',
                    collapsed ? 'w-16 px-2' : 'w-56 px-4',
                    'rounded-2xl',
                    'overflow-hidden', // prevent content overflow during transition
                    'sticky top-4'
                )}
                style={{ transitionProperty: 'width, padding' }}
            >
                <section>
                    <div className="flex items-center justify-between">
                        {!collapsed && (
                            <span className="text-lg font-semibold whitespace-nowrap select-none cursor-default">
                                FlavorForge
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            color="primary"
                            size="md"
                            className="hover:bg-transparent"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
                        </Button>
                    </div>
                    <Separator className="mb-6" />

                    <nav className="flex flex-col gap-1">
                        {filteredLinks.map((link) => (
                            <NavItem
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                Icon={link.icon}
                                collapsed={collapsed}
                            />
                        ))}
                    </nav>
                </section>

                <div className="my-4">
                    {isSignedIn ? (
                        <div
                            className={cn(
                                'flex items-center gap-2',
                                collapsed && 'justify-center'
                            )}
                        >
                            <UserButton />
                            {!collapsed && (
                                <SignOutButton>
                                    <Button
                                        rounded="full"
                                        variant="ghost"
                                        color="primary"
                                        className="w-full"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </Button>
                                </SignOutButton>
                            )}
                        </div>
                    ) : (
                        <SignInButton mode="modal">
                            <Button
                                variant="ghost"
                                color="primary"
                                className="w-full"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                </div>
            </aside>
        </section>
    );
}
