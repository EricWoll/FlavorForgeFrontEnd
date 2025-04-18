'use client';

import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import RecipeCard from './recipe.cards.component';
import { useUserContext } from '@/contexts/User.context';

export default function RecipeCardsContainer({
    listOfRecipes,
}: {
    listOfRecipes: Array<Recipe>;
}) {
    const UserContext = useUserContext();

    return (
        <div className={`flex gap-4 flex-wrap justify-center`}>
            {listOfRecipes.map((recipe: Recipe) => (
                <RecipeCard
                    key={recipe.recipeId}
                    recipeInfo={recipe}
                    isLikeDisabled={false}
                />
            ))}
        </div>
    );
}

/*
    UserContext.user == null ||
    UserContext.user.id == recipe.creatorId
*/
