'use client';

import EditRecipe from '@/components/recipe/recipeEdit.component';
import { apiGet } from '@/utils/fetchHelpers';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');
    const { data: session } = useSession();
    const Router = useRouter();
    if (!session?.user) {
        Router.push('/');
    }

    const [recipeCard, setRecipeCard] = useState<RecipeCard>({
        recipeId: null,
        userId: session?.user.userId,
        recipeName: '',
        recipeDescription: '',
        ingredients: [],
        steps: [],
        imageId: 'null',
        likesCount: 0,
    });

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
            <EditRecipe recipe={recipeCard} setRecipeCard={setRecipeCard} />
        </div>
    );
}
