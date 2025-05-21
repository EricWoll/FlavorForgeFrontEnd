'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeContainer from '@/features/cards/components/recipeContainer.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import FollowTile from '@/features/tiles/components/subscribe.tile.component';
import useWindow from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiGet } from '@/utils/handlerHelpers';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CreatorsPage() {
    const searchParams = useSearchParams();
    const creatorId = searchParams.get('id');
    const UserContext = useUserContext();

    const Window = useWindow();

    const [isShowRecipes, setIsShowRecipes] = useState<boolean>(true);

    if (!creatorId) {
        return (
            <div className="grow w-full">
                <p>Invalid Creator Id.</p>
            </div>
        );
    }

    const creatorInfo = useQuery<PublicUser, Error>({
        queryKey: ['creator_search', creatorId, UserContext.user?.id],
        queryFn: () =>
            apiGet<PublicUser>(
                `users/search/${creatorId}`,
                new URLSearchParams(
                    UserContext.user?.id
                        ? { user_id: UserContext.user?.id }
                        : {}
                ).toString()
            ),
        enabled: !!creatorId,
    });

    const recipesList = useQuery<RecipeWithCreator[]>({
        queryKey: ['creator_recipes', creatorId],
        queryFn: () =>
            apiGet<RecipeWithCreator[]>(
                'recipes/search',
                new URLSearchParams({ creator_id: creatorId }).toString()
            ),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!creatorId,
    });

    if (recipesList.error || creatorInfo.error) {
        return (
            <div className="mx-4 w-full">
                <p>
                    There was an error:{' '}
                    {recipesList.error?.message || creatorInfo.error?.message}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-4 w-full">
            <section className="flex gap-2">
                {creatorInfo.isPending ? (
                    <p>Loading Creator...</p>
                ) : (
                    <>
                        <div className="h-[100px] w-[100px] bg-tinted_gray_600 rounded-5">
                            <ImageRequest
                                filename={creatorInfo.data?.imageId}
                            />
                        </div>
                        <section className="flex flex-col justify-center">
                            <h2 className="font-bold text-2xl">
                                {creatorInfo.data?.username}
                            </h2>
                            <div className="flex flex-nowrap items-center">
                                <p className="text-tinted_gray_300 select-none">
                                    3.6M
                                </p>
                                <FollowTile
                                    isFollowed={creatorInfo.data?.followed}
                                    isDisabled={
                                        UserContext.user == null ||
                                        UserContext.user.id ==
                                            creatorInfo.data?.userId
                                    }
                                />
                            </div>
                        </section>
                    </>
                )}
            </section>
            <div className="mt-2">
                <section className="flex gap-2">
                    <Button.Hover
                        className="p-0 px-1"
                        onClick={() => {
                            setIsShowRecipes(true);
                        }}
                    >
                        Recipes
                    </Button.Hover>
                    <Button.Hover
                        className="p-0 px-1"
                        onClick={() => {
                            setIsShowRecipes(false);
                        }}
                    >
                        About
                    </Button.Hover>
                </section>
                <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                {isShowRecipes ? (
                    recipesList.isPending ? (
                        <p>Loading Recipes...</p>
                    ) : (
                        <RecipeContainer recipeList={recipesList.data} />
                    )
                ) : (
                    <p className="text-tinted_gray_300">
                        {creatorInfo.data?.aboutText}
                    </p>
                )}
            </div>
        </div>
    );
}
