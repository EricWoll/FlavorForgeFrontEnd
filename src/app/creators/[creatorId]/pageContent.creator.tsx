'use client';

import SearchIcon from '@/components/svg/searchIcon.svg.component';
import { dummyRecipes } from '@/data/dummyData';
import RecipeCardsContainer from '@/features/cards/components/recipeContainer.cards.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { useState } from 'react';

export default function CreatorPageContent({
    currentCreator,
}: {
    currentCreator: Creator | undefined;
}) {
    const listOfRecipes: Recipe[] = dummyRecipes.filter(
        (recipe) => recipe.creatorId === currentCreator?.creatorId
    );

    const [recipeSearchText, setRecipeSearchText] = useState<string>('');
    const [isShowRecipes, setIsShowRecipes] = useState<boolean>(true);

    return (
        <div className="mt-2">
            <section className="flex gap-2">
                <Button.Hover
                    className="p-0 px-1"
                    onClick={() => {
                        setIsShowRecipes(true);
                    }}
                >
                    Recipes
                </Button.Hover>
                <Button.Hover
                    className="p-0 px-1"
                    onClick={() => {
                        setIsShowRecipes(false);
                    }}
                >
                    About
                </Button.Hover>
            </section>
            <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
            {isShowRecipes ? (
                <RecipeCardsContainer listOfRecipes={listOfRecipes} />
            ) : (
                <p className="text-tinted_gray_300">{currentCreator?.about}</p>
            )}
        </div>
    );
}
