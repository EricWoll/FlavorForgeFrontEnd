'use client';

import formatNumber from '@/utils/numberFormatter';
import Link from 'next/link';
import { useState } from 'react';
import HeartIcon from '../svg/heartIcon.svg.component';
import { useRouter } from 'next/navigation';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const Router = useRouter();

    const [isRecipeLiked, setIsRecipeLiked] = useState<boolean>(
        recipe.userLikedRecipe
    );

    const handleRecipeLike = () => {
        setIsRecipeLiked((prev) => !prev);
        // update database!
        recipe.userLikedRecipe = isRecipeLiked;
    };

    return (
        <div className="max-w-[250px] max-h-[395px]">
            <img
                className="h-[250px] object-cover rounded-md mb-1 select-none"
                src={recipe.recipeImage}
            />
            <section className="grid">
                <Link
                    className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-1 w-fit rounded-md"
                    href={`/recipes/${recipe.recipeId}`}
                >
                    {recipe.recipeName}
                </Link>
                <Link
                    href={`/creators/${recipe.creatorId}`}
                    className="text-[.75em] hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-2 w-fit rounded-md text-tinted_gray_300"
                >
                    {recipe.creatorName}
                </Link>
            </section>
            <p className="text-sm line-clamp-2 my-2 select-none px-1 text-tinted_gray_300">
                {recipe.recipeDescription}
            </p>
            <section className="flex justify-between px-1 items-center mb-1">
                <Link
                    className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-1 w-fit h-fit rounded-md select-none"
                    href={`/recipes/${recipe.recipeId}`}
                >
                    View Recipe
                </Link>
                <div className="flex gap-2 select-none items-center">
                    <p className="text-tinted_gray_300">
                        {formatNumber(recipe.recipeLikes)}{' '}
                    </p>
                    <HeartIcon
                        onClick={handleRecipeLike}
                        isLiked={isRecipeLiked}
                        className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray p-1 w-fit h-fit rounded-md"
                    />
                </div>
            </section>
        </div>
    );
}
