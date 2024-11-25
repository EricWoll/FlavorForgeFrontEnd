'use client';

import EditRecipeCard from './editRecipe.Card.component';

export default function RecipeCardContainer({
    cardsList,
}: {
    cardsList: Array<RecipeCard>;
}) {
    return (
        <div className="m-2 flex flex-wrap gap-4 justify-center">
            {cardsList.length > 0 ? (
                cardsList.map((cardInfo: RecipeCard) => {
                    return (
                        <EditRecipeCard
                            key={cardInfo.recipeId}
                            card={cardInfo}
                        />
                    );
                })
            ) : (
                <p>You have no Recipes!</p>
            )}
        </div>
    );
}
