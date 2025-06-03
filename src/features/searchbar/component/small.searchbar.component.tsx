'use client';

import { Input } from '@/lib/my_custom_components/inputs/input.shadcn.component';
import { ArrowLeftIcon, SearchIcon, X } from 'lucide-react';
import { useSearchContext } from '../context/search.context';
import { Dispatch, useEffect, useRef, useState } from 'react';

interface SmallSearchBarProps {
    setIsSmallSearchIconClicked: Dispatch<React.SetStateAction<boolean>>;
}

export default function SmallSearchBar({
    setIsSmallSearchIconClicked,
}: SmallSearchBarProps) {
    const SearchContext = useSearchContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const triggerSearch = () => {
        SearchContext.search();
    };

    const clearSearch = () => {
        SearchContext.setSearchText('');
        inputRef.current?.focus();
    };
    return (
        <div className="w-full flex flex-nowrap items-center gap-2">
            <ArrowLeftIcon
                className="w-6 h-6 cursor-pointer hover:shadow-inset-gray-sm rounded-5"
                onClick={() => setIsSmallSearchIconClicked(false)}
            />
            <div className="flex-grow max-w-xl flex flex-nowrap items-center border bg-background rounded-md px-2">
                <Input
                    type="text"
                    onChange={(e) =>
                        SearchContext.setSearchText(e.target.value)
                    }
                    onEnter={() => {
                        triggerSearch();
                        setIsSmallSearchIconClicked(false);
                    }}
                    value={SearchContext.searchText}
                    ref={inputRef}
                    placeholder="Search"
                    className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                />
                {SearchContext.searchText.length > 0 && (
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={clearSearch}
                    >
                        <X className="h-5 w-5 cursor-pointer text-red-500" />
                    </div>
                )}
            </div>
            <SearchIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                    setIsSmallSearchIconClicked(false);
                    triggerSearch();
                }}
            />
        </div>
    );
}
