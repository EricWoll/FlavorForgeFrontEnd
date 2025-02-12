'use client';

import RecipeCardsContainer from '@/components/cards/recipeContainer.cards.component';
import { dummyRecipes } from '@/data/dummyData';
import {
    findRandomRecipe,
    findSearchedRecipes,
} from '@/utils/FetchHelpers/recipes.FetchHelpers';
import { apiGet } from '@/utils/handlerHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const Search = useSearchParams();

    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [searchParam, setSearchParam] = useState<string>(
        Search.get('search') || ''
    );
    const [noSearch, setNoSearch] = useState<boolean>(false);
    const [pageLoading, setPageLoading] = useState<boolean>(false); // Remember to change back to true!!!
    const [error, setError] = useState<string | null>(null);

    if (pageLoading) {
        return <div className="w-full">Loading Recipe...</div>;
    }

    if (error) {
        return <div className="error-message w-full">{error}</div>;
    }

    return (
        <div className="grow w-full">
            <RecipeCardsContainer listOfRecipes={dummyRecipes} />
        </div>
    );
}
