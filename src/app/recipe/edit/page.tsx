'use client';

import EditRecipe from '@/components/recipe/recipeEdit.component';
import { apiGet } from '@/utils/fetchHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const [recipeCard, setRecipeCard] = useState<RecipeCard>();

    useEffect(() => {
        const getRecipe = async () => {
            setRecipeCard(
                await apiGet(`recipes/${recipeId}`, '').then((res) =>
                    res.json()
                )
            );
        };
        if (recipeId != null) {
            getRecipe();
        }
    }, []);

    return (
        <div className="grow flex flex-col items-center">
            {<EditRecipe recipeInfo={recipeCard} />}
        </div>
    );
}
