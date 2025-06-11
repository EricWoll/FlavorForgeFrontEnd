'use client';

import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Bell,
    BookOpen,
    ChefHat,
    ChevronDown,
    ChevronRight,
    Heart,
    Home,
    LogOut,
    Menu,
    PlusCircle,
    Search,
    Settings,
    User,
    Users,
    X,
} from 'lucide-react';
import NavItem from './navItem.component';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState, useCallback } from 'react';
import { useUserContext } from '@/contexts/user.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';

import { NavigationItems, RecipeItems, SocialItems } from '../data/navItems';
import UserDropdown from './userDropdown.component';
import SocialDropdown from './socialDropdown.component';
import RecipeDropdown from './recipeDropdown.component';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import MobileSearchBar from '@/features/search/components/smallSearchBar.component';

export default function NavBar() {
    const pathname = usePathname();
    const Window = useWindow();
    const { user, loading } = useUserContext();

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [activeItem, setActiveItem] = useState(pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Memoize window size check to prevent unnecessary re-renders
    const checkWindowSize = useCallback(() => {
        const newIsMobile = Window.windowSize === WindowSizes.SMALL;
        const newIsCollapsed = !Window.windowSize.match(WindowSizes.LARGE);

        setIsMobile(newIsMobile);
        setIsCollapsed(newIsCollapsed);
    }, [Window.windowSize]);

    useEffect(() => {
        checkWindowSize();
    }, [checkWindowSize]);

    useEffect(() => {
        console.log('Current pathname:', pathname);
        setActiveItem(pathname);
    }, [pathname]);

    const handleNavItemClick = useCallback(
        (itemId: string) => {
            if (isMobile) {
                setIsMobileMenuOpen(false);
            }
        },
        [isMobile]
    );

    const handleMenuToggle = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!isMobile) {
                setIsCollapsed(!isCollapsed);
            }
        },
        [isMobile, isMobileMenuOpen, isCollapsed]
    );

    // Helper function to check if item is active (consistent logic)
    const isItemActive = useCallback(
        (item: any) => {
            return activeItem === (item.href || item.id);
        },
        [activeItem]
    );

    const getFilteredNavigationItems = useCallback(() => {
        if (!user) {
            // When user is not signed in, only show items that don't require authentication
            const filtered = NavigationItems.filter((item) => !item.signedIn);
            console.log(filtered);
            return filtered;
        }

        // When user is signed in, show all navigation items
        return NavigationItems;
    }, [user]);

    // Show loading state while authentication is being determined
    if (loading) {
        return (
            <div
                className={`bg-background border-r transition-all duration-300 ease-in-out flex-shrink-0 ${
                    isCollapsed ? 'w-16' : 'w-64'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center p-4 min-h-[64px]">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (isMobile) return null;

    // Desktop Version - Return the sidebar only, let parent handle layout
    return (
        <div
            className={`bg-background border-r transition-all duration-300 ease-in-out flex-shrink-0 ${
                isCollapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 min-h-[64px]">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2 transition-opacity duration-200">
                            <ChefHat className="h-6 w-6 text-red-400" />
                            <span className="font-bold text-lg select-none cursor-default">
                                FlavorForge
                            </span>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMenuToggle}
                        className="h-8 w-8 p-0 flex-shrink-0"
                        aria-label={
                            isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                        }
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>

                <Separator />

                {/* User Profile - Only show if user exists */}
                <div className="p-4">
                    <UserDropdown isCollapsed={isCollapsed} />
                </div>
                <Separator />

                {/* Navigation */}
                <ScrollArea className="flex-1 px-3">
                    <div className="space-y-1 py-2">
                        {/* Main Navigation */}
                        {getFilteredNavigationItems().map((item) => (
                            <NavItem
                                key={item.id}
                                item={item}
                                isActive={isItemActive(item)}
                                onClick={handleNavItemClick}
                                isCollapsed={isCollapsed}
                            />
                        ))}

                        {/* Only show authenticated sections if user is signed in */}
                        {user && (
                            <>
                                <div className="py-2">
                                    <Separator />
                                </div>

                                {/* Recipes Section */}
                                <RecipeDropdown
                                    activeItem={activeItem}
                                    handleNavItemClick={handleNavItemClick}
                                    isCollapsed={isCollapsed}
                                />

                                <div className="py-2">
                                    <Separator />
                                </div>

                                {/* Social Section */}
                                <SocialDropdown
                                    activeItem={activeItem}
                                    handleNavItemClick={handleNavItemClick}
                                    isCollapsed={isCollapsed}
                                />
                            </>
                        )}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-3 border-t">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={`w-full justify-start h-9 transition-all duration-200 ${
                                        isCollapsed ? 'px-2' : 'px-3'
                                    }`}
                                    onClick={() =>
                                        handleNavItemClick('settings')
                                    }
                                >
                                    <Link href="/settings">
                                        <Settings
                                            className={`h-4 w-4 transition-all duration-200 ${
                                                isCollapsed ? '' : 'mr-3'
                                            }`}
                                        />
                                        {!isCollapsed && (
                                            <span className="transition-opacity duration-200">
                                                Settings
                                            </span>
                                        )}
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="ml-2">
                                <span>Settings</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}
