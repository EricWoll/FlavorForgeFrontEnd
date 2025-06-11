'use client';

import { useSearchContext } from '@/contexts/search.context';
import { RecipeCardContainer } from '@/features/recipes/components/RecipeCardContainer';
import SearchBar from '@/features/search/components/searchBar.component';

export default function RecipeSearchPage() {
    const SearchContext = useSearchContext();

    if (!SearchContext.searchData) {
        <div className="grow w-full">No Search was done!</div>;
    }

    if (SearchContext.searchIsLoading)
        return (
            <div className="grow w-full">
                <p>Loading recipes...</p>
            </div>
        );

    if (SearchContext.searchError)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {SearchContext.searchError.message}</p>
            </div>
        );

    return (
        <div className="grow w-full">
            <div className="p-2">
                <SearchBar className="w-full" />
            </div>
            {SearchContext.searchData == null ||
            SearchContext.searchData.length < 1 ? (
                <p className="text-tinted_gray_500 italic mt-4 text-center select-none cursor-default text-xl">
                    No Recipes found
                    {SearchContext.searchData == null
                        ? '!'
                        : ` for ${SearchContext.searchText}`}
                    !
                </p>
            ) : (
                <RecipeCardContainer recipes={SearchContext.searchData} />
            )}
        </div>
    );
}
