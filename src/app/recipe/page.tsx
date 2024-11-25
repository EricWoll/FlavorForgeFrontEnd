'use client';

import CommentContainer from '@/components/comments/container.Comment.component';
import RecipePageInfo from '@/components/recipe/pageInfo.Recipe.component';
import { apiGet } from '@/utils/fetchHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const [recipeCard, setRecipeCard] = useState<RecipeCard>();
    useEffect(() => {
        const getRecipe = async () => {
            const recipeCard = await apiGet(`recipes/${recipeId}`, '').then(
                (res) => res.json()
            );
            setRecipeCard(recipeCard);
        };
        getRecipe();
    }, []);

    return (
        <div className="grow flex flex-col items-center">
            {recipeCard && <RecipePageInfo recipeCard={recipeCard} />}
            <CommentContainer />
        </div>
    );
}
