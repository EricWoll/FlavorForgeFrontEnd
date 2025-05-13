'use client';

import { useState } from 'react';
import CustomInput, {
    InputStyleType,
} from '../lib/my_custom_components/inputs/components/customInput.component';
import { useSearchContext } from '@/features/searchbar/contexts/search.context';
import { useNavBarContext } from '@/features/navbar/contexts/navbar.context';

import SearchIcon from '../components/svg/searchIcon.svg.component';
import { NavBarSmall } from '@/features/navbar/components/container.navbar.component';
import { Input } from '@/components/ui/input';
import LeftArrowIcon from '@/components/svg/leftArrowIcon.svg.component';
import MenuIcon from '@/components/svg/menuIcon.svg.component';
import UserIcon from '@/components/svg/userIcon.svg.component';

export default function Header() {
    const SearchContext = useSearchContext();
    const NavbarContext = useNavBarContext();

    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
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
                            <div className="bg-tinted_gray_600 w-7 h-7 rounded-full cursor-pointer hover:shadow-inset-gray-sm">
                                {/* Make this into a DropDown! */}
                            </div>
                        </div>
                    </>
                )}
                {isSmallSearchIconClicked && (
                    <>
                        <LeftArrowIcon
                            className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                            onClick={() => setIsSmallSearchIconClicked(false)}
                        />
                        <CustomInput
                            onChange={(e) => setLocalSearchText(e.target.value)}
                            onEnter={triggerSearch}
                            value={localSearchText}
                            styleType={InputStyleType.HEADER_SEARCH_SMALL}
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
        <header className="flex justify-between flex-nowrap p-2 gap-2">
            <MenuIcon
                className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                onClick={() => {
                    NavbarContext.setIsNavOpen((prev) => !prev);
                }}
            />
            <div className="flex flex-nowrap gap-1 w-full justify-center">
                <CustomInput
                    onChange={(e) => setLocalSearchText(e.target.value)}
                    onEnter={triggerSearch}
                    value={localSearchText}
                    styleType={InputStyleType.HEADER_SEARCH_LARGE}
                    placeholder="Search"
                />
                <SearchIcon
                    className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                    onClick={triggerSearch}
                />
            </div>
            <div className="flex flex-nowrap gap-1">
                <UserIcon
                    className={`w-8 h-8 cursor-pointer hover:shadow-inset-gray-sm rounded-5 p-1`}
                />
            </div>
        </header>
    );
}
