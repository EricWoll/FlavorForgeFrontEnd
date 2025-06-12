'use client';

import { useUserContext } from '@/contexts/user.context';
import { RecipeCardContainer } from '@/features/recipes/components/RecipeCardContainer';
import SearchBar from '@/features/search/components/searchBar.component';
import { Input } from '@/lib/my_custom_components/inputs/input.shadcn.component';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useSession, useUser } from '@clerk/nextjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Home() {
    const { user, getToken } = useUserContext();

    const getRecipes = async () => {
        const token = await getToken();

        return apiGet<RecipeWithCreator[]>(
            'recipes/search',
            new URLSearchParams({ user_id: user?.userId ?? '' }).toString(),
            token ?? null
        );
    };

    const {
        isPending,
        error,
        data: recipeList,
    } = useQuery<RecipeWithCreator[]>({
        queryKey: ['home_recipes', user?.userId],
        queryFn: getRecipes,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return (
        <div className="grow w-full">
            <div className="p-2">
                <SearchBar className="w-full" />
            </div>
            <RecipeCardContainer recipes={recipeList} />
        </div>
    );
}
