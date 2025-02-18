'use client';

import Link from 'next/link';
import ProfileDropDown from '../lib/my_custom_components/dropdowns/components/profile.dropdowns.component';
import { ChangeEvent, useState } from 'react';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import CustomInput, {
    InputStyleType,
} from '../lib/my_custom_components/inputs/components/customInput.component';
import { useSearchContext } from '@/features/searchbar/contexts/search.context';
import { useNavBarContext } from '@/lib/my_custom_components/navbar/contexts/navbar.context';

import LargeSearchBar from '../features/searchbar/components/large.searchbar.component';
import SmallSearchBar from '../features/searchbar/components/small.searchbar.component';

import MenuIcon from '../components/svg/menuIcon.svg.component';
import SearchIcon from '../components/svg/searchIcon.svg.component';
import UserIcon from '../components/svg/userIcon.svg.component';

export default function Header() {
    const Window = useWindow();
    const SearchContext = useSearchContext();
    const NavBarContext = useNavBarContext();

    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [isSmallSearchIconClicked, setIsSmallSearchIconClicked] =
        useState<boolean>(false);

    return (
        <header className="flex justify-between items-center py-2 shadow-sm z-20 px-4">
            {isSmallSearchIconClicked &&
            Window.windowSize == WindowSizes.SMALL ? (
                <SmallSearchBar
                    onChange={(e) => {
                        SearchContext.setSearchText(e.target.value);
                    }}
                    onArrowClick={() => {
                        setIsSmallSearchIconClicked((prev) => !prev);
                    }}
                    value={SearchContext.searchText}
                />
            ) : (
                <div
                    className={`grid grid-flow-col justify-between w-full items-center ${
                        !Window.windowSize.match(WindowSizes.SMALL) &&
                        'grid-cols-[1fr_2fr_1fr]'
                    }`}
                >
                    <section className="flex gap-2 items-center mr-5">
                        <MenuIcon
                            className={`w-8 h-8 select-none cursor-pointer rounded-md ${
                                NavBarContext.isNavOpen &&
                                Window.windowSize.match(WindowSizes.SMALL) &&
                                'shadow-popin_tinted_gray'
                            }`}
                            onClick={() => {
                                NavBarContext.setIsNavOpen((prev) => !prev);
                            }}
                        />
                        <Link
                            href="/"
                            className="font-extrabold text-md font-outline-1 text-white_1_000 bg-gradient_red rounded-md h-fit px-1 select-none"
                        >
                            FlavorForge
                        </Link>
                    </section>
                    {!Window.windowSize.match(WindowSizes.SMALL) && (
                        <LargeSearchBar
                            setSearchIsclicked={setIsSmallSearchIconClicked}
                            onChange={(e) => {
                                SearchContext.setSearchText(e.target.value);
                            }}
                            value={SearchContext.searchText}
                        />
                    )}
                    <section className={`flex relative gap-4 justify-end`}>
                        {Window.windowSize.match(WindowSizes.SMALL) && (
                            <div
                                className={`rounded-md select-none cursor-pointer p-1`}
                            >
                                <SearchIcon
                                    onClick={() =>
                                        setIsSmallSearchIconClicked(
                                            (prev) => !prev
                                        )
                                    }
                                    className="w-6 h-6 rounded-sm select-none cursor-pointer"
                                />
                            </div>
                        )}
                        <div
                            className={`rounded-md select-none cursor-pointer p-1 ${
                                isProfileOpen && 'shadow-popin_tinted_gray'
                            }`}
                        >
                            <UserIcon
                                className={`w-6 h-6`}
                                onClick={() =>
                                    setIsProfileOpen((prev) => !prev)
                                }
                            />
                        </div>

                        {isProfileOpen && (
                            <ProfileDropDown
                                setIsProfileOpen={setIsProfileOpen}
                                className="top-10 right-0 p-3 rounded-md"
                            />
                        )}
                    </section>
                </div>
            )}
        </header>
    );
}
