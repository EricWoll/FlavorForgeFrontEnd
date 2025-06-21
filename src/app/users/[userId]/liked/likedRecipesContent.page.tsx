'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useUserContext } from '@/contexts/user.context';
import { RecipeCardContainer } from '@/features/recipes/components/RecipeCardContainer';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useQuery } from '@tanstack/react-query';

interface LikedRecipesPageContentProps {
    userId: string | undefined;
}
export default function LikedRecipesPageContent({
    userId,
}: LikedRecipesPageContentProps) {
    const { user, getToken } = useUserContext();
    const {
        data: recipesList,
        isPending: recipesIsPending,
        error: recipesError,
    } = useQuery<RecipeWithCreator[]>({
        queryKey: ['liked_recipes', userId],
        queryFn: async () => {
            const token = await getToken();

            return apiGet<RecipeWithCreator[]>(
                `recipes/liked/search/${userId}`,
                undefined,
                token ?? null
            );
        },
        enabled: !!userId,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    if (recipesError) {
        console.error('Linked Recipes Page Error:', recipesError);
        return (
            <div className="w-full grow p-4">
                <p className="text-red-500 font-semibold">
                    Failed to load Liked Recipes data. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-4 w-full px-2">
            <section>
                <h2 className="text-3xl">Liked Recipes</h2>
            </section>
            <hr className="bg-slate-500/50 h-1 rounded-full my-2" />
            {recipesIsPending ? (
                <p>Loading Recipes...</p>
            ) : recipesList.length < 1 ? (
                <p className="text-tinted_gray_600 italic mt-4 text-center select-none cursor-default text-xl">
                    This Creator has no recipes!
                </p>
            ) : (
                <RecipeCardContainer recipes={recipesList} />
            )}
        </div>
    );
}
