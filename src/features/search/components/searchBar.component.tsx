import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchContext } from '@/contexts/search.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function SearchBar({
    className = '',
    placeholder = 'Search...',
}: {
    className?: string;
    placeholder?: string;
}) {
    const window = useWindow();

    const {
        searchText,
        setSearchText,
        search,
        searchData,
        searchError,
        searchIsPending,
        searchIsLoading,
    } = useSearchContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (searchText.trim()) {
            setSearchText?.(searchText.trim());
            search();
        } else {
            // If empty and search icon clicked, focus the input
            inputRef.current?.focus();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setSearchText('');
        inputRef.current?.focus();
    };

    if (window.windowSize.match(WindowSizes.SMALL)) return null;

    return (
        <div className={`relative w-full ${className}`}>
            <div className="relative">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-9 w-9 p-0 duration-200 z-10"
                    type="button"
                    aria-label={
                        searchText.trim() ? 'Search' : 'Focus search input'
                    }
                    disabled={searchIsLoading}
                >
                    <Search
                        className={`h-4 w-4 ${
                            searchIsLoading ? 'animate-pulse' : ''
                        }`}
                    />
                </Button>

                <Input
                    ref={inputRef}
                    placeholder={placeholder}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="pl-16 pr-16 h-12 text-base bg-background border border-border focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:border-secondary rounded-md shadow-sm"
                    disabled={searchIsLoading}
                />

                {searchText && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-secondary/80 hover:text-secondary-foreground transition-all duration-200 rounded-full"
                        type="button"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Optional: Show search status */}
            {searchError && (
                <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                    {searchError.message}
                </div>
            )}
        </div>
    );
}
