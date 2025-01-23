'use client';

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react';

interface ISearchContext {
    searchText: string | undefined;
    setSearchText: Dispatch<SetStateAction<string | undefined>>;
}

const defaultSearchContext = {
    searchText: '',
    setSearchText: () => {},
};

export const SearchContext =
    createContext<ISearchContext>(defaultSearchContext);

export const SearchProvider = ({
    children,
}: {
    children: ReactNode;
}): React.JSX.Element => {
    const [searchText, setSearchText] = useState<string | undefined>('');

    const value = { searchText, setSearchText };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = (): ISearchContext => useContext(SearchContext);
