import { Protect } from '@clerk/nextjs';
import RecipeEditPageContent from './[...id]/edit-recipe-content.page';

interface Props {
    params: { id: string | undefined };
}

export default async function RecipeEditPage({ params }: Props) {
    return null; // This is a placeholder to ensure the page is protected by Clerk
}
