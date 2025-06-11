import { Protect } from '@clerk/nextjs';
import RecipeEditPageContent from './edit-recipe-content.page';
import { useRouter } from 'next/router';
import { Metadata } from 'next';
import { QueryClient } from '@tanstack/react-query';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { auth, clerkClient } from '@clerk/nextjs/server';

interface Props {
    params: { id: string | undefined };
}

export default async function RecipeEditPage({ params }: Props) {
    return (
        <Protect>
            <RecipeEditPageContent recipeId={params.id} />
        </Protect>
    );
}
