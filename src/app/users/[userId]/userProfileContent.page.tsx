'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import formatNumber from '@/utils/numberFormatter';
import FollowTile from '@/features/tiles/components/subscribe.tile.component';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import { useEffect, useState } from 'react';
import { PublicUser } from '@/types/publicUser';
import { useUserContext } from '@/contexts/user.context';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { RecipeCardContainer } from '@/features/recipes/components/RecipeCardContainer';
import { useRouter } from 'next/navigation';

export default function UserProfileContent({
    creatorId,
}: {
    creatorId: string | undefined;
}) {
    const userContext = useUserContext();
    const { user, isLoading, getToken } = userContext;
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const creatorInfo = useQuery<PublicUser, Error>({
        queryKey: ['creator_search', creatorId, user?.userId],
        queryFn: () =>
            apiGet<PublicUser>(
                `users/search/${creatorId}`,
                new URLSearchParams(
                    user?.userId ? `?user_id=${user.userId}` : ''
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
        queryKey: ['creator_recipes', creatorId, user?.userId],
        queryFn: async () => {
            const token = await getToken();

            return apiGet<RecipeWithCreator[]>(
                'recipes/search',
                new URLSearchParams({
                    creator_id: creatorId ?? '',
                    user_id: user?.userId ?? '',
                }).toString(),
                token ?? null
            );
        },
        enabled: !!creatorId && !!user?.userId,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (!isLoading && user && creatorId) {
            setCanEdit(user.userId === creatorId);
        }
    }, [user?.userId, isLoading, creatorId]);

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
        <>
            <div className="px-4 w-full relative">
                {creatorInfo.data?.userId == user?.userId && (
                    <Link
                        href={'/recipes/edit'}
                        className="fixed z-50 bottom-5 right-5 bg-slate-500/50 rounded-5 hover:outline hover:outline-2 hover:outline-tinted_gray_300/50"
                    >
                        <Plus className="min-w-16 w-16 min-h-16 h-16 text-tinted_gray_300" />
                    </Link>
                )}
                <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-4">
                    {creatorInfo.isPending ? (
                        <Skeleton className="h-[100px] w-[100px] rounded-5" />
                    ) : !creatorInfo.data.imageUrl ? (
                        <div className="h-[100px] w-[100px] bg-slate-500 rounded-5 overflow-hidden"></div>
                    ) : (
                        <div className="h-[100px] w-[100px] bg-tinted_gray_600 rounded-5 overflow-hidden">
                            <Image
                                alt={`${creatorInfo.data.username} profile image`}
                                fill
                                src={creatorInfo.data?.imageUrl}
                            />
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
                                    userContext={userContext}
                                />
                            </div>
                        </section>
                    )}
                </section>

                <hr className="bg-slate-500/50 h-1 rounded-full my-2" />

                <div className="mt-4">
                    {recipesIsPending ? (
                        <p>Loading Recipes...</p>
                    ) : recipesList.length < 1 ? (
                        <p className="text-tinted_gray_600 italic mt-4 text-center select-none cursor-default text-xl">
                            This Creator has no recipes!
                        </p>
                    ) : (
                        <RecipeCardContainer recipes={recipesList} />
                    )}
                </div>
            </div>
        </>
    );
}
