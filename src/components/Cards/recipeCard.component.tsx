'use client';

import Link from 'next/link';
import ImageRequest from '../imageRequest.component';
import { apiPut } from '@/utils/fetchHelpers';
import { useSession } from 'next-auth/react';

export default function RecipeCard({ card }: { card: RecipeCard }) {
    const { data: session } = useSession();

    const handleLikeClick = () => {
        const newLikesCount = card.recipeLikes + 1;
        apiPut(
            'recipes/update/' + card.recipeId,
            { ...card, recipeLikes: newLikesCount },
            session?.user.accessToken
        );
    };

    return (
        <div key={card.recipeId}>
            <ImageRequest filename={''} imageWidth={250} imageHeight={250} />
            <section>
                <h2>{card.recipeName}</h2>
            </section>
            <section>
                <p>{card.recipeDescription}</p>
                <div>
                    {session?.user ? (
                        <button onClick={handleLikeClick}>
                            {card.recipeLikes} <svg />
                        </button>
                    ) : (
                        <p>{card.recipeLikes}</p>
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
    );
}
