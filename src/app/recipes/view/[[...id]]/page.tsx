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
    const { id: recipeId } = await params;

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
    const { id: recipeId } = await params; // 👈 await the params object

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViewRecipeContentPage recipeId={recipeId} />
        </HydrationBoundary>
    );
}
