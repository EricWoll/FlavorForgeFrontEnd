'use client';

import { apiGet } from '@/utils/handlerHelpers';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

interface ISearchContext {
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    search: (overrideText?: string) => void;
    searchData: RecipeWithCreator[] | null;
    searchError: Error | null;
    searchIsPending: boolean;
    searchIsLoading: boolean;
}

const defaultSearchContext: ISearchContext = {
    searchText: '',
    setSearchText: () => {},
    search: () => {},
    searchData: null,
    searchError: null,
    searchIsPending: false,
    searchIsLoading: false,
};

export const SearchContext =
    createContext<ISearchContext>(defaultSearchContext);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchText, setSearchText] = useState<string>('');
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
    const [shouldSearch, setShouldSearch] = useState(false);
    const [lastSearchTime, setLastSearchTime] = useState<number>(0);
    const lastSearchQueryRef = useRef<string>('');

    const DEBOUNCE_DELAY = 500; // ms
    const SEARCH_COOLDOWN = 5000; // ms

    // Sync searchText with URL query param on initial load or param change
    useEffect(() => {
        const query = searchParams.get('search_string')?.trim() || '';
        if (query && query !== searchText) {
            setSearchText(query);
            lastSearchQueryRef.current = query;
            setDebouncedSearchText(query);
            setShouldSearch(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!pathname.startsWith('/search')) {
            lastSearchQueryRef.current = '';
        }
    }, [pathname]);

    // Debounce input (only applies to user input, not initial sync)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(handler);
    }, [searchText]);

    const {
        data: searchData,
        error: searchError,
        isPending: searchIsPending,
        isLoading: searchIsLoading,
    } = useQuery<RecipeWithCreator[]>({
        queryKey: ['search_results', debouncedSearchText],
        queryFn: () =>
            apiGet<RecipeWithCreator[]>(
                'recipes/search',
                new URLSearchParams({
                    search_string: debouncedSearchText,
                }).toString()
            ),
        refetchOnWindowFocus: false,
        enabled: shouldSearch && !!debouncedSearchText.trim(),
    });

    // After successful fetch, reset state
    useEffect(() => {
        if (shouldSearch && searchData) {
            setShouldSearch(false);
            lastSearchQueryRef.current = debouncedSearchText;
        }
    }, [searchData, shouldSearch, debouncedSearchText]);

    const search = useCallback(
        (overrideText?: string) => {
            const now = Date.now();
            const query = (overrideText ?? searchText).trim();

            if (query === '') {
                // Reset when going to home page
                setSearchText('');
                setDebouncedSearchText('');
                lastSearchQueryRef.current = '';
                setShouldSearch(false);
                router.push('/');
                return;
            }

            if (query === lastSearchQueryRef.current) {
                // Replace with Toast!
                console.warn('Duplicate search prevented.');
                return;
            }

            if (now - lastSearchTime < SEARCH_COOLDOWN) {
                // Replace with Toast!
                console.warn(
                    'Search blocked: only one search every 5 seconds.'
                );
                return;
            }

            router.push(
                `/search?${new URLSearchParams({
                    search_string: query,
                }).toString()}`
            );

            setLastSearchTime(now);
            lastSearchQueryRef.current = query;
            setDebouncedSearchText(query);
            setShouldSearch(true);
        },
        [searchText, lastSearchTime, router]
    );

    const value: ISearchContext = {
        searchText,
        setSearchText,
        search,
        searchData: searchData || null,
        searchError: searchError || null,
        searchIsPending,
        searchIsLoading,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = (): ISearchContext => useContext(SearchContext);
