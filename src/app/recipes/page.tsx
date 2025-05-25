'use client';

import { useUserContext } from '@/contexts/User.context';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecipePage() {
    const searchParams = useSearchParams();
    const Window = useWindow();
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const recipeId = searchParams.get('id');
    const { user, loading } = useUserContext();

    const isLoggedIn = !!user?.id;

    const isSmallWindow = Window.windowSize.match(WindowSizes.SMALL);
    const isLargeWindow = Window.windowSize.match(WindowSizes.LARGE);

    const { isPending, error, data } = useQuery<RecipeWithCreator, Error>({
        queryKey: ['recipe_search', recipeId, user?.id],
        queryFn: () =>
            apiGet<RecipeWithCreator>(
                `recipes/search/${encodeURIComponent(recipeId!)}${
                    user?.id ? `?user_id=${user.id}` : ''
                }`
            ),
        enabled: !!recipeId && !loading,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (loading && data) return;
        setCanEdit(user?.id === data?.creatorId);
    }, [user?.id, loading, data]);

    if (!recipeId) {
        return (
            <div className="text-tinted_gray_500 italic mt-4 text-center select-none cursor-default w-full text-4xl">
                <p>No Recipe Found!</p>
            </div>
        );
    }

    if (isPending)
        return (
            <div className="grow w-full">
                <p>Loading recipe...</p>
            </div>
        );

    if (error)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {error.message}</p>
            </div>
        );

    return (
        <div
            className={`px-4 w-full flex ${
                isLargeWindow ? 'justify-center' : 'flex-col'
            }`}
        >
            {!isLargeWindow && (
                <section className="w-full flex flex-col justify-end py-2">
                    {canEdit && isLoggedIn && (
                        <EditButton recipeId={recipeId} />
                    )}
                    {!canEdit && isLoggedIn && (
                        <div className="mr-0 ml-auto">
                            <HeartTile
                                isLiked={data.liked}
                                recipeId={data.recipeId}
                                isDisabled={
                                    loading &&
                                    user?.id === data.creatorId &&
                                    !isLoggedIn
                                }
                                size="xl"
                            />
                        </div>
                    )}
                </section>
            )}
            <div className={`max-w-5xl`}>
                <section
                    className={`flex flex-wrap gap-2 mb-4 w-full ${
                        isLargeWindow && 'flex-nowrap justify-center'
                    }`}
                >
                    <div
                        className={`min-h-72 h-72 min-w-72 w-72 overflow-hidden rounded-5 bg-tinted_gray_600 ${
                            !isLargeWindow && 'mr-auto ml-auto'
                        }`}
                    >
                        <ImageRequest filename={data.recipeImageId} />
                    </div>
                    <div className="w-full">
                        <div className="flex flex-nowrap items-center gap-2">
                            <h1
                                className={`text-4xl hyphens-auto w-full ${
                                    !isLargeWindow && 'text-center'
                                }`}
                            >
                                {data.recipeName}
                            </h1>
                            {isLargeWindow && isLoggedIn && (
                                <div className="w-fit h-fit mr-0 ml-auto">
                                    <HeartTile
                                        isLiked={data.liked}
                                        recipeId={data.recipeId}
                                        isDisabled={
                                            loading &&
                                            user?.id === data.creatorId &&
                                            !isLoggedIn
                                        }
                                        size="xl"
                                    />
                                </div>
                            )}
                        </div>
                        <div
                            className={`flex flex-nowrap gap-1 items-center text-tinted_gray_300 ${
                                !isLargeWindow && 'justify-center'
                            }`}
                        >
                            <span className="select-none cursor-default">
                                by
                            </span>{' '}
                            <Link
                                className="hover:cursor-pointer hover:outline hover:outline-2 hover:outline-tinted_gray_600/50 px-1 rounded-5"
                                href={`/user?id=${data.creatorId}`}
                            >
                                {data.creatorUsername}
                            </Link>
                        </div>
                        <p className="my-2 text-wrap">
                            {data.recipeDescription}
                        </p>
                    </div>
                </section>
                <div className={isLargeWindow ? `grid grid-cols-2` : ''}>
                    <section className="my-4">
                        <h2
                            className={`text-2xl ${
                                isLargeWindow && 'text-center'
                            }`}
                        >
                            Ingredients
                        </h2>
                        <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                            {data.ingredients.map((ingredient, index) => (
                                <div key={index}>
                                    <p>
                                        {ingredient.amount} |{' '}
                                        {ingredient.ingredientName}
                                    </p>
                                    {data.ingredients.length > index + 1 && (
                                        <hr className="my-1 bg-tinted_gray_600/50 h-1 rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="my-4">
                        <h2
                            className={`text-2xl ${
                                isLargeWindow && 'text-center'
                            }`}
                        >
                            Directions
                        </h2>
                        <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                            {data.steps.map((step, index) => (
                                <div key={index}>
                                    <p>
                                        {index + 1}. {step}
                                    </p>
                                    {data.steps.length > index + 1 && (
                                        <hr className="my-1 bg-tinted_gray_600/50 h-1 rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                {/* <CommentsContainer /> */}
            </div>
            {canEdit && isLoggedIn && isLargeWindow && (
                <EditButton recipeId={recipeId} />
            )}
        </div>
    );
}

function EditButton({ recipeId }: { recipeId: string | null }) {
    const Window = useWindow();
    const isSmall = Window.windowSize.match(WindowSizes.SMALL);
    return (
        <Button.Link
            href={`/recipes/edit?id=${recipeId}`}
            className={`text-white bg-red-400 w-fit h-fit text-nowrap ${
                isSmall ? 'ml-auto' : ''
            }`}
        >
            Edit recipe
        </Button.Link>
    );
}
