import { auth } from '@clerk/nextjs/server';
import { cache } from 'react';
import { apiGet } from '../apiBase.fetch';

export const fetchRecipeServer = cache(async (recipeId: string) => {
    const { getToken } = await auth();
    const token = await getToken();

    return await apiGet<RecipeWithCreator>(
        `recipes/search/${recipeId}`,
        undefined, // no query params
        token,
        'default' // use default caching
    );
});
