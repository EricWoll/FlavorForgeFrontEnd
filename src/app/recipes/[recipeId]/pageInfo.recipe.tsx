'use client';

import HeartTile from '@/features/tiles/components/heart.tile.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import Link from 'next/link';

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
    );
}
