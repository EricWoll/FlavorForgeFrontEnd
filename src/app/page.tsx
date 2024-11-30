'use client';

import RecipeCard from '@/components/Cards/recipe.Card.component';
import SearchBar from '@/components/searchBar.component';
import { apiGet } from '@/utils/fetchHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const Search = useSearchParams();

    const [recipes, setRecipes] = useState<Array<RecipeCard>>([]);
    const [searchParam, setSearchParam] = useState<string>(
        Search.get('search') || ''
    );
    const [noSearch, setNoSearch] = useState<boolean>(false);

    useEffect(() => {
        const getRecipes = async () => {
            if ((searchParam == null || searchParam == '') && !noSearch) {
                setRecipes(
                    await apiGet('search/recipes', 'pageAmount=10').then(
                        (res) => res.json()
                    )
                );
                setNoSearch(true);
            } else {
                setRecipes(
                    await apiGet(`search/recipes/${searchParam}`).then((res) =>
                        res.json()
                    )
                );
                setNoSearch(false);
            }
        };
        getRecipes();
    }, [searchParam]);

    return (
        <div className="grow">
            <SearchBar
                searchParam={searchParam}
                setSearchParam={setSearchParam}
            />
            <div className="grow flex flex-wrap m-5 gap-4">
                {recipes.map((cardInfo: RecipeCard) => {
                    return (
                        <RecipeCard key={cardInfo.recipeId} card={cardInfo} />
                    );
                })}
            </div>
        </div>
    );
}
