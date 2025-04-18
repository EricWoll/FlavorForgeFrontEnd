'use client';

import HeartTile from '@/features/tiles/components/heart.tile.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';

export default function RecipePageInfo({
    currentRecipe,
}: {
    currentRecipe: Recipe | undefined;
}) {
    const Window = useWindow();

    return (
        <section className={`flex flex-wrap gap-2 mb-4 justify-center`}>
            <img
                src={currentRecipe?.recipeImage}
                className="h-[250px] w-[250px] object-cover rounded-lg"
            />
            <div>
                <h1
                    className={`text-4xl ${
                        Window.windowSize.match(WindowSizes.SMALL) &&
                        'text-center'
                    }`}
                >
                    {currentRecipe?.recipeName}
                </h1>

                <span
                    className={`flex flex-nowrap gap-1 items-center text-tinted_gray_300 ${
                        Window.windowSize.match(WindowSizes.SMALL) &&
                        'justify-center'
                    }`}
                >
                    <HeartTile isLiked={currentRecipe?.userLikedRecipe} />{' '}
                    {/* Add isDisabled portion tp heartTile*/}
                    by
                    <Button.Link href={`/creators/${currentRecipe?.creatorId}`}>
                        {currentRecipe?.creatorName}
                    </Button.Link>
                </span>

                <p className="my-2">{currentRecipe?.recipeDescription}</p>
            </div>
        </section>
    );
}
