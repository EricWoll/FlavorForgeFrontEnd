'use client';

import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import RecipeCard from './recipe.cards.component';
import { useUserContext } from '@/contexts/User.context';

export default function RecipeCardsContainer({
    listOfRecipes,
}: {
    listOfRecipes: Array<Recipe>;
}) {
    const Window = useWindow();
    const UserContext = useUserContext();

    return (
        <div
            className={`flex gap-4 flex-wrap ${
                Window.windowSize === WindowSizes.SMALL && 'justify-center'
            }`}
        >
            {listOfRecipes.map((recipe: Recipe) => (
                <RecipeCard
                    key={recipe.recipeId}
                    recipeInfo={recipe}
                    isLikeDisabled={
                        UserContext.user == null ||
                        UserContext.user.id == recipe.creatorId
                    }
                />
            ))}
        </div>
    );
}
