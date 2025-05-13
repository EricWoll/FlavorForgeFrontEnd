'use client';

import RecipeContainer from '@/features/cards/components/recipeContainer.component';
import { apiGet } from '@/utils/handlerHelpers';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Home() {
    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery<RecipeWithCreator[]>({
        queryKey: ['home_recipes'],
        queryFn: () => apiGet<RecipeWithCreator[]>('recipes/search'),
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
