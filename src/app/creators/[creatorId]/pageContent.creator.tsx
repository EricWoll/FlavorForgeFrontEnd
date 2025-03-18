'use client';

import SearchIcon from '@/components/svg/searchIcon.svg.component';
import { dummyRecipes } from '@/data/dummyData';
import RecipeCardsContainer from '@/features/cards/components/recipeContainer.cards.component';
import CustomInput, {
    InputStyleType,
} from '@/lib/my_custom_components/inputs/components/customInput.component';
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
                <p
                    className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-1 w-fit h-fit rounded-md select-none cursor-pointer"
                    onClick={() => {
                        setIsShowRecipes(true);
                    }}
                >
                    Recipes
                </p>
                <p
                    className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-1 w-fit h-fit rounded-md select-none cursor-pointer"
                    onClick={() => {
                        setIsShowRecipes(false);
                    }}
                >
                    About
                </p>
            </section>
            <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
            {isShowRecipes ? (
                <RecipeCardsContainer listOfRecipes={listOfRecipes} />
            ) : (
                <p>{currentCreator?.about}</p>
            )}
        </div>
    );
}
