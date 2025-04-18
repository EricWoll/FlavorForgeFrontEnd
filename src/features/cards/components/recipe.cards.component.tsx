'use client';

import formatNumber from '@/utils/numberFormatter';
import Link from 'next/link';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';

interface RecipeCardProps {
    recipeInfo: Recipe;
    isLikeDisabled: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
    const Router = useRouter();

    return (
        <div className="max-w-[250px] max-h-[395px]">
            <Link href={`/recipes/${props.recipeInfo.recipeId}`}>
                <img
                    className="h-[250px] object-cover rounded-md mb-1 select-none"
                    src={props.recipeInfo.recipeImage}
                />
            </Link>
            <section className="grid">
                <Button.Link href={`/recipes/${props.recipeInfo.recipeId}`}>
                    {props.recipeInfo.recipeName}
                </Button.Link>
                <Button.Link
                    href={`/creators/${props.recipeInfo.creatorId}`}
                    className="text-[.75em]"
                >
                    {props.recipeInfo.creatorName}
                </Button.Link>
            </section>
            <p className="text-sm line-clamp-2 my-2 select-none px-1 text-tinted_gray_300">
                {props.recipeInfo.recipeDescription}
            </p>
            <section className="flex justify-between px-1 items-center mb-1">
                <Button.Link href={`/recipes/${props.recipeInfo.recipeId}`}>
                    View Recipe
                </Button.Link>
                <div className="flex gap-2 select-none items-center">
                    <p className="text-tinted_gray_300">
                        {formatNumber(props.recipeInfo.recipeLikes)}{' '}
                    </p>
                    <HeartTile
                        isLiked={props.recipeInfo.userLikedRecipe}
                        isDisabled={props.isLikeDisabled}
                    />
                </div>
            </section>
        </div>
    );
}
