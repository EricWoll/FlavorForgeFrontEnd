'use client';

import Link from 'next/link';
import ImageRequest from '../Images/request.image.component';
import { ReactNode } from 'react';

export default function EditRecipeCard({
    card,
}: {
    card: RecipeCard;
}): ReactNode {
    return (
        <div className="flex flex-col justify-start items-center my-4 relative rounded-md border border-stroke overflow-hidden">
            <Link
                href={{
                    pathname: '/recipe/edit',
                    query: { id: card.recipeId },
                }}
                className="absolute right-4 top-3 rounded-md bg-slate-400 text-slate-900 px-3 hover:bg-slate-600 hover:text-slate-200"
            >
                Edit
            </Link>
            {card.imageId != 'none' ? (
                <ImageRequest
                    filename={card.imageId}
                    imageWidth={256}
                    imageHeight={256}
                    keyId={card.imageId}
                />
            ) : (
                <div className="w-64 h-64 bg-slate-700 rounded-md"></div>
            )}
            <div className="w-64 flex flex-col gap-3 pb-3 flex-grow px-2">
                <h2 className="text-center">{card.recipeName}</h2>

                <p className="max-h-9 truncate text-gray-500">
                    {card.recipeDescription}
                </p>
                <div className="text-right select-none">
                    <Link
                        href={{
                            pathname: '/recipe',
                            query: { id: card.recipeId },
                        }}
                    >
                        View Recipe
                    </Link>
                </div>
            </div>
        </div>
    );
}
