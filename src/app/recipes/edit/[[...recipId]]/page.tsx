import { Protect } from '@clerk/nextjs';
import RecipeEditPageContent from './recipe.content.page';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface Props {
    params: { recipeId: string[] | undefined };
}

export default async function RecipeEditPage({ params }: Props) {
    return <RecipeEditPageContent recipeId={params.recipeId?.[0]} />;
}
