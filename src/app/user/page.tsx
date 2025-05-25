'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeContainer from '@/features/cards/components/recipeContainer.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import FollowTile from '@/features/tiles/components/subscribe.tile.component';
import useWindow from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import formatNumber from '@/utils/numberFormatter';
import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreatorsPage() {
    const searchParams = useSearchParams();
    const creatorId = searchParams.get('id');
    const { user, loading } = useUserContext();
    const [isShowRecipes, setIsShowRecipes] = useState(true);
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const creatorInfo = useQuery<PublicUser, Error>({
        queryKey: ['creator_search', creatorId, user?.id],
        queryFn: () =>
            apiGet<PublicUser>(
                `users/search/${creatorId}`,
                new URLSearchParams(
                    user?.id ? `?user_id=${user.id}` : ''
                ).toString()
            ),
        enabled: !!creatorId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const {
        data: recipesList,
        isPending: recipesIsPending,
        error: recipesError,
    } = useQuery<RecipeWithCreator[]>({
        queryKey: ['creator_recipes', creatorId, user?.id],
        queryFn: () =>
            apiGet<RecipeWithCreator[]>(
                'recipes/search',
                new URLSearchParams({
                    creator_id: creatorId ?? '',
                    user_id: user?.id ?? '',
                }).toString()
            ),
        enabled: !!creatorId,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (loading && user && creatorId) return;
        setCanEdit(user?.id === creatorId);
    }, [user?.id, loading, creatorId]);

    if (!creatorId) {
        return (
            <div className="w-full grow p-4">
                <p className="text-red-500 font-semibold">
                    Invalid Creator ID.
                </p>
            </div>
        );
    }

    if (recipesError || creatorInfo.error) {
        console.error('Creator Page Error:', recipesError ?? creatorInfo.error);
        return (
            <div className="w-full grow p-4">
                <p className="text-red-500 font-semibold">
                    Failed to load creator data. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="px-4 w-full relative">
            <Link
                href={'/recipes/edit'}
                className="absolute z-50 bottom-5 right-5 bg-tinted_gray_600/50 rounded-5 hover:outline hover:outline-2 hover:outline-tinted_gray_300/50"
            >
                <Plus className="min-w-16 w-16 min-h-16 h-16 text-tinted_gray_300" />
            </Link>
            <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-4">
                {creatorInfo.isPending ? (
                    <Skeleton className="h-[100px] w-[100px] rounded-5" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-tinted_gray_600 rounded-5 overflow-hidden">
                        <ImageRequest filename={creatorInfo.data?.imageId} />
                    </div>
                )}

                {creatorInfo.isPending ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                ) : (
                    <section className="flex flex-col flex-grow justify-center w-full">
                        <h2 className="font-bold text-2xl">
                            {creatorInfo.data?.username}
                        </h2>
                        <div className="flex items-center gap-2">
                            <p className="text-tinted_gray_300 select-none">
                                {formatNumber(
                                    creatorInfo.data?.followerCount ?? 0
                                )}{' '}
                                followers
                            </p>
                            <FollowTile
                                creatorId={creatorInfo.data!.userId}
                                isFollowed={creatorInfo.data!.followed}
                                isDisabled={
                                    !user ||
                                    user.id === creatorInfo.data?.userId
                                }
                            />
                        </div>
                    </section>
                )}
            </section>

            <div className="mt-4">
                <section className="flex gap-2 mb-2">
                    <Button.Hover
                        size="small"
                        className={`p-0 px-2 ${
                            isShowRecipes
                                ? 'border-b-2 border-b-tinted_gray_600'
                                : ''
                        }`}
                        onClick={() => setIsShowRecipes(true)}
                    >
                        Recipes
                    </Button.Hover>
                    <Button.Hover
                        size="small"
                        className={clsx('p-0 px-2', {
                            'border-b-2 border-b-tinted_gray_600':
                                !isShowRecipes,
                        })}
                        onClick={() => setIsShowRecipes(false)}
                    >
                        About
                    </Button.Hover>
                </section>

                <hr className="bg-tinted_gray_600/50 h-1 rounded-full" />

                <div className="mt-4">
                    {isShowRecipes ? (
                        recipesIsPending ? (
                            <p>Loading Recipes...</p>
                        ) : recipesList.length < 1 ? (
                            <p className="text-tinted_gray_600 italic mt-4 text-center select-none cursor-default text-xl">
                                This Creator has no recipes!
                            </p>
                        ) : (
                            <RecipeContainer
                                recipeList={recipesList}
                                showCreatorIcon={false}
                            />
                        )
                    ) : creatorInfo.isPending ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <p className="text-tinted_gray_300 whitespace-pre-wrap text-center w-full">
                            {creatorInfo.data?.aboutText ||
                                'No about text provided.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
