'use client';

import CommentContainer from '@/components/comments/container.Comment.component';
import RecipePageInfo from '@/components/recipe/pageInfo.Recipe.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const { user, loading } = useUserContext();

    const [recipe, setRecipe] = useState<RecipeCard>();
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleGetRecipe = async (user: IUserContextPublic | null) => {
        if (user) {
            return await apiGet(
                `recipes/followed/${recipeId}`,
                `user_id=${user.id}`,
                user.token
            );
        } else {
            return await apiGet(`recipes/${recipeId}`);
        }
    };

    useEffect(() => {
        const getRecipe = async () => {
            if (loading) return;

            try {
                setPageLoading(true);
                if (recipeId) {
                    const response = await handleGetRecipe(user);

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
                setPageLoading(false);
            }
        };
        getRecipe();
    }, [recipeId, user, loading]);

    if (pageLoading) {
        return <div>Loading Recipe...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow flex flex-col items-center">
            {recipe && (
                <RecipePageInfo
                    recipeCard={recipe}
                    updateRecipe={setRecipe}
                    user={user}
                />
            )}
            <CommentContainer />
        </div>
    );
}
