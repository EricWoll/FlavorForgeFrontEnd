'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeCard from './recipe.card.component';
import { useEffect } from 'react';

interface RecipeContainerProps {
    recipeList: Array<RecipeWithCreator> | null;
    showCreatorIcon?: boolean;
}

export default function RecipeContainer({
    showCreatorIcon = true,
    ...props
}: RecipeContainerProps) {
    const userContext = useUserContext();

    if (!props.recipeList) {
        return <div>No recipes found.</div>;
    }

    const isLoggedIn = !!userContext.user?.id;

    return (
        <div className={`flex gap-4 flex-wrap justify-center pb-4`}>
            {props.recipeList?.map((recipe: RecipeWithCreator) => (
                <RecipeCard
                    key={recipe.recipeId}
                    recipe={recipe}
                    isLikeDisabled={
                        userContext.loading ||
                        userContext.user?.id == recipe.creatorId ||
                        !isLoggedIn
                    }
                    showCreatorIcon={showCreatorIcon}
                />
            ))}
        </div>
    );
}
