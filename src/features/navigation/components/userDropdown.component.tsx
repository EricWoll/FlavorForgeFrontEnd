import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Bell, ChevronDown, LogIn, LogOut, Settings, User } from 'lucide-react';
import { SignInButton, SignOutButton } from '@clerk/nextjs';

import Link from 'next/link';
import { useUserContext } from '@/contexts/user.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';

interface UserDropdownProps {
    isCollapsed: boolean;
}

export default function UserDropdown({ isCollapsed }: UserDropdownProps) {
    const { user, isLoading } = useUserContext();
    const { windowSize } = useWindow();
    const isMobile = windowSize === WindowSizes.SMALL;

    // Show loading state
    if (isLoading) {
        return (
            <Button
                variant="ghost"
                className={`w-full transition-colors duration-200 ${
                    isCollapsed
                        ? 'justify-center p-2'
                        : 'justify-start p-2 h-auto'
                }`}
                disabled
            >
                {isCollapsed ? (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="animate-pulse bg-muted">
                            ...
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <>
                        <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
                            <AvatarFallback className="animate-pulse bg-muted">
                                ...
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-left flex-1 min-w-0">
                            <div className="h-4 bg-muted animate-pulse rounded mb-1"></div>
                            <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                        </div>
                    </>
                )}
            </Button>
        );
    }

    // User is not signed in - show sign in button
    if (!user) {
        const signInButton = (
            <Button
                asChild
                variant="ghost"
                className={`w-full transition-colors duration-200 hover:bg-accent ${
                    isCollapsed
                        ? 'justify-center p-2'
                        : 'justify-start px-3 h-9'
                }`}
            >
                <Link href="/auth">
                    {isCollapsed ? (
                        <LogIn className="h-4 w-4" />
                    ) : (
                        <>
                            <LogIn className="h-4 w-4 mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left">
                                Sign In / Sign Up
                            </span>
                        </>
                    )}
                </Link>
            </Button>
        );

        if (isCollapsed) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>{signInButton}</TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                            <span>Sign In / Sign Up</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return signInButton;
    }

    // User is signed in - show full dropdown
    const collapsedButton = (
        <Button
            variant="ghost"
            className="w-full justify-center p-2 hover:bg-accent transition-colors duration-200"
        >
            <Avatar className="h-8 w-8">
                <AvatarImage
                    src={user.imageUrl}
                    alt={user.username || 'User avatar'}
                />
                <AvatarFallback className="text-xs font-medium bg-primary/10 hover:bg-primary/20 transition-colors">
                    {user?.username}
                </AvatarFallback>
            </Avatar>
        </Button>
    );

    const expandedButton = (
        <Button
            variant="ghost"
            className="w-full justify-start p-2 h-auto hover:bg-accent transition-colors duration-200"
        >
            <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
                <AvatarImage
                    src={user.imageUrl}
                    alt={user.username || 'User avatar'}
                />
                <AvatarFallback className="text-xs font-medium bg-primary/10">
                    {user?.username}
                </AvatarFallback>
            </Avatar>
            <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                    {user.username || 'User'}
                </p>
            </div>
            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200" />
        </Button>
    );

    // Determine dropdown positioning based on mobile state
    const getDropdownSide = () => {
        if (isMobile) return 'bottom';
        return isCollapsed ? 'right' : 'bottom';
    };

    const getDropdownAlign = () => {
        if (isMobile) return 'center';
        return isCollapsed ? 'start' : 'start';
    };

    return (
        <DropdownMenu>
            {isCollapsed ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                {collapsedButton}
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                            <span>{user.username || 'User Menu'}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <DropdownMenuTrigger asChild>
                    {expandedButton}
                </DropdownMenuTrigger>
            )}

            <DropdownMenuContent
                align={getDropdownAlign()}
                side={getDropdownSide()}
                sideOffset={isMobile ? 8 : isCollapsed ? 8 : 4}
                className="w-56 z-50"
                avoidCollisions={true}
                collisionPadding={8}
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 select-none cursor-default">
                        <p className="text-sm font-medium leading-none">
                            {user.username || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email || 'No email available'}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link
                        href={`/users/${user.userId}/profile`}
                        className="cursor-pointer flex items-center w-full"
                    >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/settings"
                        className="cursor-pointer flex items-center w-full"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                {/* <DropdownMenuItem asChild>
                    <Link
                        href="/user/notifications"
                        className="cursor-pointer flex items-center w-full"
                    >
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </Link>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    asChild
                    className="cursor-pointer select-none"
                >
                    <SignOutButton>
                        <div className="w-full text-left text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center px-2 py-1.5 text-sm rounded-sm hover:bg-red-50">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </div>
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
