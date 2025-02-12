'use client';

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

interface ISearchContext {
    searchText: string | undefined;
    setSearchText: Dispatch<SetStateAction<string | undefined>>;
    search: () => void;
}

const defaultSearchContext = {
    searchText: '',
    setSearchText: () => {},
    search: () => {},
};

export const SearchContext =
    createContext<ISearchContext>(defaultSearchContext);

export const SearchProvider = ({
    children,
}: {
    children: ReactNode;
}): React.JSX.Element => {
    const [searchText, setSearchText] = useState<string | undefined>('');

    const search = async () => {
        if (searchText && searchText.trim().length > 0) {
            console.log('Searching for: ' + searchText);
        }
    };

    const value = { searchText, setSearchText, search };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = (): ISearchContext => useContext(SearchContext);
