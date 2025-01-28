'use client';

import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import RecipeCard from './recipe.cards.component';

export default function RecipeCardsContainer({
    listOfRecipes,
}: {
    listOfRecipes: Array<Recipe>;
}) {
    const Window = useWindow();

    return (
        <div
            className={`flex gap-4 flex-wrap ${
                Window.windowSize.match(WindowSizes.SMALL) && 'justify-center'
            }`}
        >
            {listOfRecipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.recipeId} recipe={recipe} />
            ))}
        </div>
    );
}
