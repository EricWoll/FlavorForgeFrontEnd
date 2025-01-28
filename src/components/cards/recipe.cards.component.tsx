'use client';

import formatNumber from '@/utils/numberFormatter';
import Link from 'next/link';
import { useState } from 'react';
import HeartIcon from '../svgs/heartIcon.svg.component';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const [isRecipeLiked, setIsRecipeLiked] = useState<boolean>(
        recipe.userLikedRecipe
    );

    const handleRecipeLike = () => {
        setIsRecipeLiked((prev) => !prev);
        // update database!
    };

    return (
        <div className="max-w-[250px] max-h-[395px] overflow-hidden">
            <img
                className="h-[250px] object-cover rounded-md"
                src={recipe.recipeImage}
            />
            <section className="grid">
                <p>{recipe.recipeName}</p>
                <Link href="" className="text-[.75em]">
                    {recipe.creatorName}
                </Link>
            </section>
            <p className="text-sm line-clamp-3 my-2 select-none">
                {recipe.recipeDescription}
            </p>
            <section className="flex justify-between">
                <Link href="">View Recipe</Link>
                <div className="flex gap-2">
                    {formatNumber(recipe.recipeLikes)}{' '}
                    <HeartIcon
                        onClick={handleRecipeLike}
                        isLiked={isRecipeLiked}
                    />
                </div>
            </section>
        </div>
    );
}
