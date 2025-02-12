'use client';

import RecipeCard from './recipe.cards.component';

export default function RecipeCardsContainer({
    listOfRecipes,
}: {
    listOfRecipes: Array<Recipe>;
}) {
    return (
        <div className={`flex gap-4 flex-wrap justify-center`}>
            {listOfRecipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.recipeId} recipe={recipe} />
            ))}
        </div>
    );
}
