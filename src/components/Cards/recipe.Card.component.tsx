'use client';

import Link from 'next/link';
import ImageRequest from '../Images/request.image.component';
import { apiPut } from '@/utils/fetchHelpers';
import { useSession } from 'next-auth/react';

export default function RecipeCard({ card }: { card: RecipeCard }) {
    const { data: session } = useSession();

    const handleLikeClick = () => {
        const newLikesCount = card.likesCount + 1;
        apiPut(
            'recipes/update/' + card.recipeId,
            { ...card, recipeLikes: newLikesCount },
            session?.user.accessToken
        );
    };

    return (
        <div className="flex flex-col justify-center items-center my-4">
            {card.imageId != 'null' ? (
                <ImageRequest
                    filename={card.imageId}
                    imageWidth={250}
                    imageHeight={250}
                />
            ) : (
                <div className="w-64 h-64 bg-slate-700 block"></div>
            )}
            <div className="max-w-64">
                <section className="text-center">
                    <h2>{card.recipeName}</h2>
                </section>
                <section>
                    <p>{card.recipeDescription}</p>
                    <div className="flex flex-nowrap justify-between my-1 mx-4">
                        {session?.user ? (
                            <button onClick={handleLikeClick}>
                                {card.likesCount} Likes <svg />
                            </button>
                        ) : (
                            <p>{card.likesCount} Likes</p>
                        )}

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
