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
        <div className="flex flex-col justify-center items-center my-4 relative rounded-md border border-stroke overflow-hidden">
            <Link
                href={{
                    pathname: '/recipe/edit',
                    query: { id: card.recipeId },
                }}
                className="absolute right-4 top-3 rounded-md bg-slate-400 text-slate-900 px-3 hover:bg-slate-600 hover:text-slate-200"
            >
                Edit
            </Link>
            {card.imageId != 'null' ? (
                <ImageRequest
                    filename={card.imageId}
                    imageWidth={250}
                    imageHeight={250}
                />
            ) : (
                <div className="w-64 h-64 bg-slate-700 block rounded-md"></div>
            )}
            <div className="max-w-64">
                <section className="text-center">
                    <h2>{card.recipeName}</h2>
                </section>
                <section className="grid my-2 gap-2 px-2">
                    <p>{card.recipeDescription}</p>
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
                </section>
            </div>
        </div>
    );
}
