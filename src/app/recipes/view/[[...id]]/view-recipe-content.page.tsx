'use client';

import { Button } from '@/components/ui/button';
import { useUserContext } from '@/contexts/user.context';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ViewRecipeContentPage({
    recipeId,
}: {
    recipeId: string;
}) {
    const userContext = useUserContext();
    const {
        user,
        isAuthenticated,
        getToken,
        isLoading: isUserLoading,
    } = userContext;
    const Window = useWindow();

    const [canEdit, setCanEdit] = useState<boolean>(false);

    const {
        data: recipe,
        isPending,
        error,
    } = useQuery<RecipeWithCreator, Error>({
        queryKey: ['recipe_item_search', recipeId],
        queryFn: async () => {
            const token = await getToken();
            return await apiGet<RecipeWithCreator>(
                `recipes/search/${recipeId}?user_id=${user?.userId}`,
                undefined,
                token
            );
        },
        enabled: !isUserLoading && !!user?.userId, // 👈 block query until ready
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (isPending && recipe) return;
        setCanEdit(user?.userId === recipe?.creatorId);
    }, [user?.userId, isPending, recipe]);

    if (!recipeId)
        return (
            <div className="text-tinted_gray_500 italic mt-4 text-center select-none cursor-default w-full text-4xl">
                <p>No Recipe Found!</p>
            </div>
        );

    if (isPending)
        return (
            <div className="grow w-full">
                <p>Loading recipe...</p>
            </div>
        );

    if (userContext.isLoading) {
        return <div className="w-full text-center mt-10">Loading user...</div>;
    }

    if (error)
        return (
            <div className="grow w-full">
                Error loading recipe: {error.message}
            </div>
        );

    if (!recipe) return <div className="grow w-full">Recipe not found</div>;

    return (
        <div className="w-full flex flex-col items-center px-4 my-5">
            <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-6">
                {/* Thumbnail */}
                <div className="w-full max-w-sm mx-auto lg:mx-0 relative aspect-video rounded-lg overflow-hidden bg-muted">
                    {!recipe.recipeImageId ||
                    recipe.recipeImageId == '' ||
                    recipe.recipeImageId == 'none' ? (
                        <div className="w-full h-full bg-slate-500"></div>
                    ) : (
                        <Image
                            src={recipe.recipeImageId}
                            alt={recipe.recipeName}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold leading-tight">
                            {recipe.recipeName}
                        </h1>
                        <div className="text-muted-foreground text-sm">
                            by{' '}
                            <Link
                                href={`/user?id=${recipe.creatorId}`}
                                className="hover:underline"
                            >
                                {recipe.creatorUsername}
                            </Link>
                        </div>
                        <p className="text-base leading-relaxed">
                            {recipe.recipeDescription}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        {isAuthenticated && (
                            <>
                                {canEdit ? (
                                    <EditButton recipeId={recipeId} />
                                ) : (
                                    <HeartTile
                                        isLiked={recipe.liked}
                                        recipeId={recipe.recipeId}
                                        userContext={userContext}
                                        size="xl"
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Ingredients & Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl w-full">
                <section>
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Ingredients
                    </h2>
                    <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                        {recipe.ingredients.map((ingredient, i) => (
                            <p key={i}>
                                <span className="font-medium">
                                    {ingredient.amount}
                                </span>{' '}
                                — {ingredient.ingredientName}
                            </p>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Directions
                    </h2>
                    <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                        {recipe.steps.map((step, i) => (
                            <p key={i}>
                                <span className="font-medium">{i + 1}.</span>{' '}
                                {step}
                            </p>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function EditButton({ recipeId }: { recipeId: string | null }) {
    const Window = useWindow();
    const isSmall = Window.windowSize.match(WindowSizes.SMALL);
    return (
        <Link href={`/recipes/edit?id=${recipeId}`}>
            <Button
                variant="link"
                className={`text-white bg-red-400 w-fit h-fit text-nowrap ${
                    isSmall ? 'ml-auto' : ''
                }`}
            >
                Edit recipe
            </Button>
        </Link>
    );
}
