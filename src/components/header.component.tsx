'use client';

import Link from 'next/link';
import ProfileDropDown from './dropdowns/profile.dropdowns.component';
import { ChangeEvent, useState } from 'react';
import SearchBar from './searchbar.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import CustomInput, { InputStyleType } from './customInput.component';
import { useSearchContext } from '@/contexts/search.context';
import { useNavBarContext } from '@/contexts/navbar.context';

import MenuIcon from '@/svgs/icon-menu.svg';
import UserIcon from '@/svgs/icon-user.svg';
import LeftArrowIcon from '@/svgs/icon-arrow-left.svg';

export default function Header() {
    const Window = useWindow();
    const SearchContext = useSearchContext();
    const NavBarContext = useNavBarContext();

    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [isSmallSearchIconClicked, setIsSmallSearchIconClicked] =
        useState<boolean>(false);

    const handleProfileClick = () => {
        setIsProfileOpen((prev) => !prev);
    };

    return (
        <header className="flex justify-between items-center py-2 shadow-sm z-20 px-4">
            {isSmallSearchIconClicked &&
            Window.windowSize == WindowSizes.SMALL ? (
                <div className="flex gap-2 w-screen">
                    <LeftArrowIcon
                        className="w-6 h-6 select-none cursor-pointer"
                        onClick={() => {
                            setIsSmallSearchIconClicked((prev) => !prev);
                        }}
                        viewBox="0 0 40 40"
                    />
                    <CustomInput
                        onChange={(e) => {
                            SearchContext.setSearchText(e.target.value);
                        }}
                        value={SearchContext.searchText}
                        styleType={InputStyleType.HEADER_SEARCH_SMALL}
                        inputType="search"
                    />
                </div>
            ) : (
                <>
                    <section className="flex gap-2 items-center mr-5">
                        <MenuIcon
                            viewBox="0 0 40 40"
                            className={`w-8 h-8 select-none cursor-pointer rounded-md ${
                                NavBarContext.isNavOpen &&
                                Window.windowSize.match(WindowSizes.SMALL) &&
                                'shadow-inner_tinted_gray_1'
                            }`}
                            onClick={() => {
                                NavBarContext.setIsNavOpen((prev) => !prev);
                            }}
                        />
                        <Link
                            href="/"
                            className="font-extrabold text-md font-outline-1 text-white_1_000 bg-gradient_red rounded-md h-fit px-1 font-outline-1 select-none"
                        >
                            FlavorForge
                        </Link>
                    </section>
                    <section
                        className={`flex items-center relative gap-4 ${
                            Window.windowSize == WindowSizes.SMALL
                                ? 'justify-center'
                                : 'justify-between w-full'
                        }`}
                    >
                        <SearchBar
                            searchIsclicked={isSmallSearchIconClicked}
                            setSearchIsclicked={setIsSmallSearchIconClicked}
                            onChange={(e) => {
                                SearchContext.setSearchText(e.target.value);
                            }}
                            value={SearchContext.searchText}
                        />

                        <div
                            className={`rounded-md select-none cursor-pointer p-1 ${
                                isProfileOpen && 'shadow-inner_tinted_gray_1'
                            }`}
                        >
                            <UserIcon
                                viewBox="0 0 24 24"
                                className={`w-6 h-6`}
                                onClick={handleProfileClick}
                            />
                        </div>

                        {isProfileOpen && (
                            <ProfileDropDown className="top-10 right-0 p-3 rounded-md" />
                        )}
                    </section>
                </>
            )}
        </header>
    );
}
