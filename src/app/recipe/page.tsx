'use client';

import CommentContainer from '@/components/comments/container.Comment.component';
import RecipePageInfo from '@/components/recipe/pageInfo.Recipe.component';
import { apiGet } from '@/utils/fetchHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const [recipe, setRecipe] = useState<RecipeCard>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRecipe = async () => {
            try {
                setLoading(true);
                if (recipeId) {
                    const response = await apiGet(`recipes/${recipeId}`);
                    if (!response.ok) {
                        throw new Error(
                            `Failed to fecth recipe: ${response.statusText}`
                        );
                    }
                    const recipeData = await response.json();
                    setRecipe(recipeData);
                } else {
                    setError('Recipe Id is missing!');
                }
            } catch (error) {
                setError('Error loading Recipe. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        getRecipe();
    }, [recipeId]);

    if (loading) {
        return <div>Loading Recipe...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow flex flex-col items-center">
            {recipe && <RecipePageInfo recipeCard={recipe} />}
            <CommentContainer />
        </div>
    );
}
