import { fetchRecipeServer } from '@/utils/fetch/server/api.fetch';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import ViewRecipeContentPage from './view-recipe-content.page';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const recipeId = params.id;

    try {
        // This will be cached and shared with the page component
        const recipe = await fetchRecipeServer(recipeId);

        return {
            title: recipe?.recipeName || 'Recipe Not Found',
            description:
                recipe?.recipeDescription || 'Recipe description not available',
            openGraph: {
                title: recipe?.recipeName,
                description: recipe?.recipeDescription,
                images: recipe?.recipeImageId
                    ? [{ url: recipe.recipeImageId }]
                    : [],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Recipe Not Available',
            description: 'Unable to load recipe information',
        };
    }
}

export default async function RecipePage({ params }: Props) {
    const queryClient = new QueryClient();
    const recipeId = params.id;

    try {
        // This uses the same cached data from generateMetadata - NO duplicate request!
        const recipe = await fetchRecipeServer(recipeId);

        // Inject the server data directly into React Query cache
        queryClient.setQueryData(['recipe_item_search', recipeId], recipe);
    } catch (error) {
        console.error('Error prefetching recipe:', error);
        // Continue rendering even if there's an error
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViewRecipeContentPage recipeId={recipeId} />
        </HydrationBoundary>
    );
}
