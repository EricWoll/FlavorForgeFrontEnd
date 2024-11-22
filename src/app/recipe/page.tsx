'use client';

import CommentContainer from '@/components/comments/container.Comment.component';
import ImageRequest from '@/components/Images/request.image.component';
import { apiGet } from '@/utils/fetchHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const [recipeCard, setRecipeCard] = useState<RecipeCard>();
    useEffect(() => {
        const getRecipe = async () => {
            setRecipeCard(
                await apiGet(`recipes/${recipeId}`, '').then((res) =>
                    res.json()
                )
            );
        };
        getRecipe();
    }, []);

    return (
        <div className="grow flex flex-col items-center">
            {recipeCard && (
                <>
                    <section className="flex flex-row flex-wrap w-full gap-10 justify-center">
                        {recipeCard?.imageId != 'null' ? (
                            <ImageRequest
                                filename={recipeCard.imageId}
                                imageWidth={250}
                                imageHeight={250}
                            />
                        ) : (
                            <div className="w-64 h-64 bg-slate-700 block rounded-md"></div>
                        )}
                        <section>
                            <h2 className="text-3xl text-center">
                                {recipeCard?.recipeName}
                            </h2>
                            <p>{recipeCard?.recipeDescription}</p>
                        </section>
                    </section>
                    <section className="flex flex-col w-full px-10 gap-4 mt-5">
                        <section>
                            <h3 className="text-2xl">Ingredients</h3>
                            <ul className="rounded-md border-4 border-stroke p-2 w-full list-disc list-inside">
                                {recipeCard?.ingredients.map((ingredient) => (
                                    <li key={ingredient.name}>
                                        {ingredient.amount} {ingredient.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h3 className="text-2xl">Directions</h3>
                            <ol className="rounded-md border-4 border-stroke p-2 w-full list-decimal list-inside">
                                {recipeCard?.steps.map((step) => (
                                    <li key={recipeCard.steps.indexOf(step)}>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </section>
                </>
            )}
            <CommentContainer />
        </div>
    );
}
