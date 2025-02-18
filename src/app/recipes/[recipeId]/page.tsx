import HeartIcon from '@/components/svg/heartIcon.svg.component';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import { dummyRecipes } from '@/data/dummyData';
import Link from 'next/link';
import { useState } from 'react';

interface RecipePageProps {
    params: Promise<{
        recipeId: string;
    }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
    const { recipeId } = await params;

    const currentRecipe = dummyRecipes.find(
        (recipe) => recipe.recipeId === recipeId
    );

    /* temporary comment controller */
    const commentsIsOpen = true;

    return (
        <div className="mx-4">
            <section className="flex flex-wrap justify-center gap-2 mb-4">
                <img
                    src={currentRecipe?.recipeImage}
                    className="h-[250px] w-[250px] object-cover rounded-lg"
                />
                <div>
                    <h1 className={`text-4xl text-center`}>
                        {currentRecipe?.recipeName}
                    </h1>

                    <span className="flex flex-nowrap gap-1 items-center text-tinted_gray_300 justify-center">
                        <HeartTile isLiked={currentRecipe?.userLikedRecipe} />
                        by
                        <Link
                            href={`/creators/${currentRecipe?.creatorId}`}
                            className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-1 w-fit rounded-md "
                        >
                            {currentRecipe?.creatorName}
                        </Link>
                    </span>

                    <p className="my-2">{currentRecipe?.recipeDescription}</p>
                </div>
            </section>
            <section className="">
                <h2 className="text-2xl">Ingredients</h2>
                <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                    {currentRecipe?.recipeIngredients.map(
                        (ingredient, index) => (
                            <div key={index}>
                                <p>
                                    {ingredient.amount} | {ingredient.name}
                                </p>
                                {currentRecipe.recipeIngredients.length >
                                    index + 1 && (
                                    <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                                )}
                            </div>
                        )
                    )}
                </div>
            </section>
            <section className="my-4">
                <h2 className="text-2xl">Directions</h2>
                <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                    {currentRecipe?.recipeSteps.map((step, index) => (
                        <div key={index}>
                            <p>
                                {index + 1}. {step}
                            </p>
                            {currentRecipe.recipeSteps.length > index + 1 && (
                                <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            {/* Make the comment section it's own component! */}
            <section>
                <div className="flex flex-nowrap justify-between mb-4 px-2 py-2 shadow-popout_tinted_gray active:shadow-popin_tinted_gray rounded-md text-tinted_gray_300">
                    <h2>Comments</h2>
                    <p>Arrow</p>
                </div>
                {commentsIsOpen && (
                    <div>
                        <p>all the comments!!!</p>
                    </div>
                )}
            </section>
        </div>
    );
}
