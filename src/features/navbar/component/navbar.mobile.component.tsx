'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.shadcn.component';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { LogIn, LogOut, LucideProps, Menu } from 'lucide-react';
import NavItem from './navItem.component';
import { NavLinks } from '@/types/navLinks';
import { getFilteredLinks, navLinks } from '../data/navLinks';
import { UserWithRole } from '@/types/userWithRole';
import { Dispatch, SetStateAction } from 'react';

interface MobileNavProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function MobileNav({ open, onOpenChange }: MobileNavProps) {
    const { isSignedIn, user } = useUser();

    const Window = useWindow();

    const isMobile = Window.windowSize.match(WindowSizes.SMALL);

    if (!isMobile) return;

    const filteredLinks = getFilteredLinks(
        navLinks,
        isSignedIn,
        user as UserWithRole | null
    );

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="w-64"
                aria-describedby={undefined}
            >
                <SheetHeader className="mb-4 text-left text-lg font-semibold border-b border-muted pb-2">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                    {filteredLinks.map((link) => (
                        <NavItem
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            Icon={link.icon}
                            onClick={() => onOpenChange(!open)}
                        />
                    ))}
                    {isSignedIn ? (
                        <SignOutButton>
                            <Button
                                variant="ghost"
                                color="primary"
                                className="mt-4 justify-start"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </SignOutButton>
                    ) : (
                        <SignInButton mode="modal">
                            <Button
                                variant="ghost"
                                className="mt-4 justify-start"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

export function MobileNavTrigger({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Button
            variant="ghost"
            color="primary"
            size="md"
            className="m-2"
            onClick={() => onOpenChange(!open)}
            aria-label="Open menu"
        >
            <Menu className="h-5 w-5" />
        </Button>
    );
}
