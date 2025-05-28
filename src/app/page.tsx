'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeContainer from '@/features/cards/components/recipeContainer.component';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Home() {
    const { user } = useUserContext();

    const { isPending, error, data } = useQuery<RecipeWithCreator[]>({
        queryKey: ['home_recipes', user?.id],
        queryFn: () =>
            apiGet<RecipeWithCreator[]>(
                'recipes/search',
                new URLSearchParams({ user_id: user?.id ?? '' }).toString(),
                user?.token ?? null
            ),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    if (isPending)
        return (
            <div className="grow w-full">
                <p>Loading recipes...</p>
            </div>
        );

    if (error)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {error.message}</p>
            </div>
        );

    return (
        <div className="grow w-full">
            <RecipeContainer recipeList={data} />
        </div>
    );
}
