'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { useUserContext } from '@/contexts/user.context';
import { NavigationItems } from '../data/navItems';
import { ChefHat, Menu, Settings, X } from 'lucide-react';
import NavItem from './navItem.component';
import RecipeDropdown from './recipeDropdown.component';
import SocialDropdown from './socialDropdown.component';
import MobileSearchBar from '@/features/search/components/smallSearchBar.component';
import UserDropdown from './userDropdown.component';

export default function SmallNav() {
    const pathname = usePathname();
    const Window = useWindow();
    const { user, isLoading } = useUserContext();

    const [activeItem, setActiveItem] = useState(pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Update mobile flag based on window size changes and close menu when transitioning to desktop.
    const checkWindowSize = useCallback(() => {
        const newIsMobile = Window.windowSize === WindowSizes.SMALL;
        setIsMobile(newIsMobile);
        if (!newIsMobile && isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [Window.windowSize, isMobileMenuOpen]);

    useEffect(() => {
        checkWindowSize();
    }, [checkWindowSize]);

    useEffect(() => {
        setActiveItem(pathname);
    }, [pathname]);

    const handleNavItemClick = useCallback(
        (itemId: string) => {
            if (isMobile) {
                setIsMobileMenuOpen(false);
            }
            // Your nav item click handler logic here.
        },
        [isMobile]
    );

    const isItemActive = useCallback(
        (item: any) => activeItem === (item.href || item.id),
        [activeItem]
    );

    const getFilteredNavigationItems = useCallback(() => {
        if (!user) {
            // When user is not signed in, only show items that don’t require authentication.
            return NavigationItems.filter((item) => !item.signedIn);
        }
        return NavigationItems;
    }, [user]);

    if (isLoading && isMobile) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
        );
    }

    // Only render mobile navigation
    if (!isMobile) return null;

    return (
        <>
            {/* Mobile Header Bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b shadow-sm md:hidden">
                <div className="flex items-center justify-between p-4 h-16">
                    {/* Menu Button wrapped in SheetTrigger */}
                    <Sheet
                        open={isMobileMenuOpen}
                        onOpenChange={setIsMobileMenuOpen}
                    >
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-10 w-10 p-0"
                                aria-label={
                                    isMobileMenuOpen
                                        ? 'Close menu'
                                        : 'Open menu'
                                }
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </SheetTrigger>

                        {/* Mobile Sidebar using SheetContent */}
                        <SheetContent side="left" className="w-80">
                            <SheetHeader>
                                <SheetTitle className="flex items-center  justify-center my-4">
                                    <ChefHat className="h-6 w-6 text-red-400" />
                                    <span className="font-bold text-lg select-none cursor-default">
                                        FlavorForge
                                    </span>
                                </SheetTitle>
                            </SheetHeader>

                            <Separator />

                            <ScrollArea className="flex-1 px-3">
                                <div className="space-y-1 py-2">
                                    {getFilteredNavigationItems().map(
                                        (item) => (
                                            <NavItem
                                                key={item.id}
                                                item={item}
                                                isActive={isItemActive(item)}
                                                onClick={handleNavItemClick}
                                                isCollapsed={false}
                                            />
                                        )
                                    )}

                                    {user && (
                                        <>
                                            <div className="py-2">
                                                <Separator />
                                            </div>
                                            <RecipeDropdown
                                                activeItem={activeItem}
                                                handleNavItemClick={
                                                    handleNavItemClick
                                                }
                                                isCollapsed={false}
                                            />
                                            <div className="py-2">
                                                <Separator />
                                            </div>
                                            <SocialDropdown
                                                activeItem={activeItem}
                                                handleNavItemClick={
                                                    handleNavItemClick
                                                }
                                                isCollapsed={false}
                                            />
                                        </>
                                    )}
                                </div>
                            </ScrollArea>

                            <div className="p-3 border-t bg-background/95">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start h-9 px-3"
                                    onClick={() =>
                                        handleNavItemClick('settings')
                                    }
                                >
                                    <Link href="/user/settings">
                                        <Settings className="h-4 w-4 mr-3" />
                                        <span>Settings</span>
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <ChefHat className="h-6 w-6 text-red-400" />
                        <span className="font-bold text-lg select-none cursor-default">
                            FlavorForge
                        </span>
                    </div>

                    {/* Right side - Search and User */}
                    <div className="flex items-center gap-2">
                        <MobileSearchBar />
                        {user && <UserDropdown isCollapsed={true} />}
                    </div>
                </div>
            </div>

            {/* Add padding to the body content to account for the fixed header */}
            <div className="h-16 md:hidden" />
        </>
    );
}
