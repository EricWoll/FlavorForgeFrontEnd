'use client';

import { useUserContext } from '@/contexts/User.context';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiGet } from '@/utils/handlerHelpers';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipePage() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');
    const Window = useWindow();

    const { user, loading } = useUserContext();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    if (!recipeId) {
        return (
            <div className="grow w-full">
                <p>Invalid Recipe ID.</p>
            </div>
        );
    }

    useEffect(() => {
        if (loading) return;
        if (user?.id) {
            setIsLoggedIn(true);
        }
    }, [user]);

    const { isPending, error, data } = useQuery<RecipeWithCreator, Error>({
        queryKey: ['recipe_search', recipeId],
        queryFn: () =>
            apiGet<RecipeWithCreator>(
                `recipes/search/${encodeURIComponent(recipeId)}`
            ),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!recipeId,
    });

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
            className={`mx-4 w-full flex ${
                !Window.windowSize.match(WindowSizes.SMALL)
                    ? 'flex-row'
                    : 'flex-wrap gap-1'
            }`}
        >
            {isLoggedIn && Window.windowSize.match(WindowSizes.SMALL) && (
                <Button.Link
                    href={`/recipes/edit?id=${recipeId}`}
                    className="text-white bg-red-400 w-fit h-fit text-nowrap mr-0 ml-auto"
                >
                    Edit recipe
                </Button.Link>
            )}
            <div className="w-full">
                <section className={`flex flex-wrap gap-2 mb-4 justify-center`}>
                    <div className="h-72 w-72 object-cover rounded-5 bg-tinted_gray_600">
                        <ImageRequest filename={data.recipeImageId} />
                    </div>
                    <section className="flex flex-nowrap">
                        <div>
                            <h1
                                className={`text-4xl ${
                                    Window.windowSize.match(
                                        WindowSizes.SMALL
                                    ) && 'text-center'
                                }`}
                            >
                                {data?.recipeName}
                            </h1>

                            <span
                                className={`flex flex-nowrap gap-1 items-center text-tinted_gray_300 ${
                                    Window.windowSize.match(
                                        WindowSizes.SMALL
                                    ) && 'justify-center'
                                }`}
                            >
                                <HeartTile isLiked={data?.isLiked} />{' '}
                                {/* Add isDisabled portion tp heartTile*/}
                                by
                                <Button.Link
                                    href={`/user?id=${data?.creatorId}`}
                                >
                                    {data?.creatorUsername}
                                </Button.Link>
                            </span>

                            <p className="my-2">{data?.recipeDescription}</p>
                        </div>
                    </section>
                </section>
                <section className="">
                    <h2 className="text-2xl">Ingredients</h2>
                    <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                        {data?.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <p>
                                    {ingredient.amount} |{' '}
                                    {ingredient.ingredientName}
                                </p>
                                {data.ingredients.length > index + 1 && (
                                    <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                <section className="my-4">
                    <h2 className="text-2xl">Directions</h2>
                    <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                        {data.steps.map((step, index) => (
                            <div key={index}>
                                <p>
                                    {index + 1}. {step}
                                </p>
                                {data.steps.length > index + 1 && (
                                    <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                {/* <CommentsContainer /> */}
            </div>
            {isLoggedIn && !Window.windowSize.match(WindowSizes.SMALL) && (
                <Button.Link
                    href={`/recipes/edit?id=${recipeId}`}
                    className="text-white bg-red-400 w-fit h-fit text-nowrap"
                >
                    Edit recipe
                </Button.Link>
            )}
        </div>
    );
}
