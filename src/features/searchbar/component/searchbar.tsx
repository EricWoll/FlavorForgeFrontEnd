'use client';

import { useSearchContext } from '@/features/searchbar/context/search.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Input } from '@/lib/my_custom_components/inputs/input.shadcn.component';
import { ThemeButtonToggle } from '@/lib/my_custom_components/toggle/theme.toggle.component';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function SearchBar() {
    const SearchContext = useSearchContext();
    const Window = useWindow();

    const inputRef = useRef<HTMLInputElement>(null);

    const isMobile = Window.windowSize.match(WindowSizes.SMALL);

    const triggerSearch = () => {
        SearchContext.search();
    };

    const clearSearch = () => {
        SearchContext.setSearchText('');
        inputRef.current?.focus();
    };

    if (isMobile) return null;

    return (
        <section className="flex flex-nowrap gap-4 items-center mr-4">
            <div className="w-full bg-background shadow-md rounded-2xl border px-4 py-2 flex items-center gap-2">
                <Search
                    className="h-5 w-5 text-muted-foreground cursor-pointer"
                    onClick={triggerSearch}
                />
                <Input
                    type="text"
                    onChange={(e) =>
                        SearchContext.setSearchText(e.target.value)
                    }
                    onEnter={triggerSearch}
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
        </section>
    );
}
