'use client';

import RecipeCard from '@/components/Cards/recipe.Card.component';
import SearchBar from '@/components/searchBar.component';
import {
    findRandomRecipe,
    findSearchedRecipes,
} from '@/utils/FetchHelpers/recipes.FetchHelpers';
import { apiGet } from '@/utils/handlerHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const Search = useSearchParams();

    const [recipes, setRecipes] = useState<Array<RecipeCard>>([]);
    const [searchParam, setSearchParam] = useState<string>(
        Search.get('search') || ''
    );
    const [noSearch, setNoSearch] = useState<boolean>(false);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                setPageLoading(true);
                if ((searchParam == null || searchParam == '') && !noSearch) {
                    setRecipes(await findRandomRecipe());
                    setNoSearch(true);
                } else {
                    setRecipes(await findSearchedRecipes(searchParam));
                    setNoSearch(false);
                }
            } catch (error) {
                setError('Error loading Recipes. Please try again later.');
            } finally {
                setPageLoading(false);
            }
        };
        getRecipes();
    }, [searchParam]);

    if (pageLoading) {
        return <div>Loading Recipe...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow">
            <SearchBar
                searchParam={searchParam}
                setSearchParam={setSearchParam}
            />
            <div className="grow flex flex-wrap m-5 gap-4 justify-center">
                {recipes.map((cardInfo: RecipeCard) => {
                    return (
                        <RecipeCard key={cardInfo.recipeId} card={cardInfo} />
                    );
                })}
            </div>
        </div>
    );
}
