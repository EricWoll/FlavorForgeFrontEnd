import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchContext } from '@/contexts/search.context';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function MobileSearchBar({
    className = '',
    placeholder = 'Search...',
    onClose,
}: {
    className?: string;
    placeholder?: string;
    onClose?: () => void;
}) {
    const {
        searchText,
        setSearchText,
        search,
        searchData,
        searchError,
        searchIsPending,
        searchIsLoading,
    } = useSearchContext();

    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus when expanded
    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    const handleSearch = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            return;
        }

        if (searchText.trim()) {
            setSearchText?.(searchText.trim());
            search();
        } else {
            inputRef.current?.focus();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'Escape') {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
        setSearchText('');
        onClose?.();
    };

    const clearSearch = () => {
        setSearchText('');
        inputRef.current?.focus();
    };

    // Collapsed state - just the search icon
    if (!isExpanded) {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                className={`h-10 w-10 p-0 rounded-full ${className}`}
                type="button"
                aria-label="Open search"
            >
                <Search className="h-5 w-5" />
            </Button>
        );
    }

    // Expanded state - full search bar
    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-lg ${className}`}
        >
            <div className="flex items-center gap-2 p-3">
                {/* Back button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="h-10 w-10 p-0 rounded-full flex-shrink-0"
                    type="button"
                    aria-label="Close search"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>

                {/* Search input container */}
                <div className="relative flex-1">
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            placeholder={placeholder}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="pl-4 pr-12 h-10 text-base bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-red-400/60 rounded-full"
                            disabled={searchIsLoading}
                            autoComplete="off"
                        />

                        {/* Clear button */}
                        {searchText && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearSearch}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-secondary/80 transition-all duration-200 rounded-full"
                                type="button"
                                aria-label="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Search button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSearch}
                    className="h-10 w-10 p-0 rounded-full flex-shrink-0 bg-red-400 hover:bg-red-500 text-white"
                    type="button"
                    aria-label="Search"
                    disabled={searchIsLoading || !searchText.trim()}
                >
                    {searchIsLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                        <Search className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Error message */}
            {searchError && (
                <div className="px-3 pb-3">
                    <div className="p-2 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                        {searchError.message}
                    </div>
                </div>
            )}
        </div>
    );
}
