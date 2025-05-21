'use client';

import RecipeContainer from '@/features/cards/components/recipeContainer.component';
import { useSearchContext } from '@/contexts/search.context';

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
            <RecipeContainer recipeList={SearchContext.searchData} />
        </div>
    );
}
