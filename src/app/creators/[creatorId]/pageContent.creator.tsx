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
    return (
        <div className="mt-2">
            <section className="flex gap-2">
                <p>Recipes</p>
                <p>Recent</p>
                <p>About</p>
            </section>
            <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
            <section className="flex items-center">
                <CustomInput
                    styleType={InputStyleType.HEADER_SEARCH_LARGE}
                    onChange={(e) => {
                        setRecipeSearchText(e.target.value);
                    }}
                    value={recipeSearchText}
                    placeholder="Search"
                    inputType="search"
                />{' '}
                {/* Customize the styleType!!! */}
                <button className="flex gap-2 flex-nowrap text-xl items-center">
                    <SearchIcon /> Search
                </button>
            </section>
            <section className="flex items-center">
                <div className="w-full">Display Filter Chips Here!</div>
                <button className="flex gap-2 flex-nowrap text-xl items-center">
                    <SearchIcon /> Filter
                </button>
            </section>
            <RecipeCardsContainer listOfRecipes={listOfRecipes} />
        </div>
    );
}
