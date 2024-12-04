'use client';

import EditRecipe from '@/components/recipe/recipeEdit.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const { user, loading } = useUserContext();
    const router = useRouter();

    const [recipe, setRecipe] = useState<RecipeCard>({
        recipeId: null,
        creatorId: user?.id || '',
        creatorUsername: user?.name || '',
        recipeName: '',
        recipeDescription: '',
        ingredients: [],
        steps: [],
        imageId: 'none',
        likesCount: 0,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading || !user || !user.id) return;

        if (!user?.id) {
            router.push('/'); // Redirect if not logged in
        }

        const getRecipe = async () => {
            try {
                if (recipeId) {
                    const response = await apiGet(`recipes/${recipeId}`);
                    if (!response.ok) {
                        throw new Error(
                            `Failed fetching User: ${response.statusText}`
                        );
                    }
                    const recipeData = await response.json();
                    setRecipe(recipeData);
                    console.log(recipeData);
                }
            } catch (error) {
                setError('Error loading user. Please try again later');
            }
        };
        getRecipe();
    }, [user, loading]);

    if (loading) {
        return <div>Loading Recipe...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grow flex flex-col items-center">
            <EditRecipe recipe={recipe} setRecipeCard={setRecipe} />
        </div>
    );
}
