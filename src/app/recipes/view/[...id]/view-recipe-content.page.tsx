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
    const { user, isAuthenticated, getToken } = userContext;
    const Window = useWindow();

    const isLargeWindow = Window.windowSize.match(WindowSizes.LARGE);

    const [canEdit, setCanEdit] = useState<boolean>(false);

    const {
        data: recipe,
        isPending,
        error,
    } = useQuery<RecipeWithCreator, Error>({
        queryKey: ['recipe_item_search', recipeId],
        queryFn: async (): Promise<RecipeWithCreator> => {
            const token = await getToken();
            return await apiGet<RecipeWithCreator>(
                `recipes/search/${recipeId}`,
                undefined,
                token
            );
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        // The server data will be used initially, then this will only refetch if stale
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

    if (error)
        return (
            <div className="grow w-full">
                Error loading recipe: {error.message}
            </div>
        );

    if (!recipe) return <div className="grow w-full">Recipe not found</div>;

    return (
        <div
            className={`px-4 w-full flex ${
                isLargeWindow ? 'justify-center' : 'flex-col'
            }`}
        >
            {!isLargeWindow && (
                <section className="w-full flex flex-col justify-end py-2">
                    {canEdit && isAuthenticated && (
                        <EditButton recipeId={recipeId} />
                    )}
                    {!canEdit && isAuthenticated && (
                        <div className="mr-0 ml-auto">
                            <HeartTile
                                isLiked={recipe.liked}
                                recipeId={recipe.recipeId}
                                userContext={userContext}
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
                        <Image
                            alt={`${recipe.recipeName} image`}
                            src={recipe.recipeImageId}
                            fill
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex flex-nowrap items-center gap-2">
                            <h1
                                className={`text-4xl hyphens-auto w-full ${
                                    !isLargeWindow && 'text-center'
                                }`}
                            >
                                {recipe.recipeName}
                            </h1>
                            {isLargeWindow && isAuthenticated && (
                                <div className="w-fit h-fit mr-0 ml-auto">
                                    <HeartTile
                                        isLiked={recipe.liked}
                                        recipeId={recipe.recipeId}
                                        userContext={userContext}
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
                                href={`/user?id=${recipe.creatorId}`}
                            >
                                {recipe.creatorUsername}
                            </Link>
                        </div>
                        <p className="my-2 text-wrap">
                            {recipe.recipeDescription}
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
                            {recipe.ingredients.map((ingredient, index) => (
                                <div key={index}>
                                    <p>
                                        {ingredient.amount} |{' '}
                                        {ingredient.ingredientName}
                                    </p>
                                    {recipe.ingredients.length > index + 1 && (
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
                            {recipe.steps.map((step, index) => (
                                <div key={index}>
                                    <p>
                                        {index + 1}. {step}
                                    </p>
                                    {recipe.steps.length > index + 1 && (
                                        <hr className="my-1 bg-tinted_gray_600/50 h-1 rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                {/* <CommentsContainer /> */}
            </div>
            {canEdit && isAuthenticated && isLargeWindow && (
                <EditButton recipeId={recipeId} />
            )}
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
