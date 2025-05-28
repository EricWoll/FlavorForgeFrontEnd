'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeContainer from '@/features/cards/components/recipeContainer.component';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useQuery } from '@tanstack/react-query';

export default function LikedRecipesContent() {
    const { user, loading: userLoading } = useUserContext();

    const {
        data: recipesList,
        isPending: recipesPending,
        error: recipesError,
    } = useQuery({
        queryKey: ['user_liked', user?.id],
        queryFn: () =>
            apiGet<Array<RecipeWithCreator>>(
                `recipes/liked/search/${user?.id}`,
                undefined,
                user?.token
            ),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!user?.id && !userLoading,
    });

    if (recipesPending)
        return (
            <div className="grow w-full">
                <p>Loading recipes...</p>
            </div>
        );

    if (recipesError)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {recipesError.message}</p>
            </div>
        );

    return (
        <div className="px-4 mb-4 w-full">
            <h2 className="text-tinted_gray_300 text-3xl pb-2 select-none cursor-default">
                Liked Recipes
            </h2>
            <hr className="bg-tinted_gray_600/50 h-1 rounded-full" />
            <section className="mt-4">
                {recipesList && recipesList.length >= 1 ? (
                    <RecipeContainer recipeList={recipesList} />
                ) : (
                    <p className="text-tinted_gray_600 italic mt-4 text-center select-none cursor-default text-xl">
                        You have no Liked Recipes!
                    </p>
                )}
            </section>
        </div>
    );
}
