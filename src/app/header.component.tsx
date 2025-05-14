'use client';

import { useRef, useState } from 'react';
import Input from '@/lib/my_custom_components/inputs/components/input.Form.component';

import { useSearchContext } from '@/features/searchbar/contexts/search.context';
import { useNavBarContext } from '@/features/navbar/contexts/navbar.context';

import SearchIcon from '../components/svg/searchIcon.svg.component';
import { NavBarSmall } from '@/features/navbar/components/container.navbar.component';
import LeftArrowIcon from '@/components/svg/leftArrowIcon.svg.component';
import MenuIcon from '@/components/svg/menuIcon.svg.component';
import UserIcon from '@/components/svg/userIcon.svg.component';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItemProps,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useUserContext } from '@/contexts/User.context';
import Link from 'next/link';
import { UrlObject } from 'url';
import { Search, X } from 'lucide-react';

export default function Header() {
    const SearchContext = useSearchContext();
    const NavbarContext = useNavBarContext();
    const UserContext = useUserContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const [isSmallSearchIconClicked, setIsSmallSearchIconClicked] =
        useState<boolean>(false);

    const [localSearchText, setLocalSearchText] = useState(
        SearchContext.searchText || ''
    );

    const triggerSearch = () => {
        SearchContext.setSearchText(localSearchText);
        SearchContext.search(localSearchText);
    };

    if (NavbarContext.isMobile) {
        return (
            <header
                className={`flex justify-between items-center py-2 shadow-sm px-4 ${
                    isSmallSearchIconClicked && 'gap-2'
                }`}
            >
                {!isSmallSearchIconClicked && (
                    <>
                        <NavBarSmall />
                        <div className="flex flex-nowrap gap-2 items-center">
                            <SearchIcon
                                className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                                onClick={() =>
                                    setIsSmallSearchIconClicked(true)
                                }
                            />
                            <UserDropDown />
                        </div>
                    </>
                )}
                {isSmallSearchIconClicked && (
                    <>
                        <LeftArrowIcon
                            className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                            onClick={() => setIsSmallSearchIconClicked(false)}
                        />
                        <Input
                            onChange={(e) => setLocalSearchText(e.target.value)}
                            onEnter={triggerSearch}
                            value={localSearchText}
                            placeholder="Search"
                        />
                        <SearchIcon
                            className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                            onClick={() => {
                                setIsSmallSearchIconClicked(false);
                                triggerSearch();
                            }}
                        />
                    </>
                )}
            </header>
        );
    }

    return (
        <header className="flex justify-between flex-nowrap px-2 gap-2 items-center">
            <MenuIcon
                className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                onClick={() => {
                    NavbarContext.setIsNavOpen((prev) => !prev);
                }}
            />
            <div className="flex-grow max-w-xl">
                <Input
                    ref={inputRef}
                    size="full"
                    paddingX="sm"
                    paddingY="sm"
                    borderColor="border-tinted_gray_500"
                    onChange={(e) => setLocalSearchText(e.target.value)}
                    onEnter={triggerSearch}
                    value={localSearchText}
                    placeholder="Search"
                    trailingIcon={
                        <div className="flex flex-nowrap gap-1 items-center">
                            {localSearchText.length > 0 && (
                                <X
                                    className="w-5 h-5 text-tinted_gray_100 stroke-current cursor-pointer"
                                    stroke="currentColor"
                                    onClick={() => {
                                        setLocalSearchText('');
                                        inputRef.current?.focus();
                                    }}
                                />
                            )}
                            <Search
                                className="w-6 h-6 text-tinted_gray_100 stroke-current cursor-pointer"
                                stroke="currentColor"
                                onClick={triggerSearch}
                            />
                        </div>
                    }
                />
            </div>

            {!UserContext.user?.id ? (
                <UserDropDown />
            ) : (
                <Link href="/auth/login">Log In</Link>
            )}
        </header>
    );
}

function UserDropDown() {
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
                <button aria-label="Open profile menu">
                    <UserIcon
                        className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 bg-tinted_gray_700 rounded-5 p-2 w-56 !outline outline-2 !outline-tinted_gray_600 shadow-gray-sm">
                <UserDropDownLink
                    href="/user/profile"
                    displayText="Profile"
                    dropDownProps={{
                        onClick: () => {
                            setIsProfileOpen(false);
                        },
                    }}
                />
                <UserDropDownLink
                    href="/user/settings"
                    displayText="Settings"
                    dropDownProps={{
                        onClick: () => {
                            setIsProfileOpen(false);
                        },
                    }}
                />
                <DropdownMenuSeparator />
                <UserDropDownItem
                    displayText="Sign Out"
                    dropDownProps={{ onClick: () => {} }}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface UserDropDownLinkProps {
    dropDownProps?: DropdownMenuItemProps;
    href: string | UrlObject;
    displayText: string;
    icon?: React.ReactNode;
}

function UserDropDownLink(props: UserDropDownLinkProps) {
    return (
        <Link href={props.href}>
            <DropdownMenuItem
                {...props.dropDownProps}
                asChild
                onClick={props.dropDownProps?.onClick}
                className="hover:cursor-pointer !bg-tinted_gray_700 hover:shadow-gray-sm active:shadow-inset-gray-sm my-2"
            >
                <div className="flex items-center gap-2">
                    {props.icon}
                    {props.displayText}
                </div>
            </DropdownMenuItem>
        </Link>
    );
}

interface UserDropDownItemProps {
    dropDownProps?: DropdownMenuItemProps;
    displayText: string;
    icon?: React.ReactNode;
}

function UserDropDownItem(props: UserDropDownItemProps) {
    return (
        <DropdownMenuItem
            {...props.dropDownProps}
            asChild
            onClick={props.dropDownProps?.onClick}
            className="hover:cursor-pointer !bg-tinted_gray_700 hover:shadow-gray-sm active:shadow-inset-gray-sm my-2"
        >
            <div className="flex items-center gap-2">
                {props.icon}
                {props.displayText}
            </div>
        </DropdownMenuItem>
    );
}
