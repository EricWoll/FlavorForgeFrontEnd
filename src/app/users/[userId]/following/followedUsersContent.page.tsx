'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useUserContext } from '@/contexts/user.context';
import FollowTile from '@/features/tiles/components/subscribe.tile.component';
import { PublicUser } from '@/types/publicUser';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import formatNumber from '@/utils/numberFormatter';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

interface FollowedUsersPageContentProps {
    userId: string | undefined;
}

export default function FollowedUsersPageContent({
    userId,
}: FollowedUsersPageContentProps) {
    const UserContext = useUserContext();
    const { user, isLoading, getToken } = UserContext;

    const creatorList = useQuery({
        queryKey: ['creator_followed'],
        queryFn: async () => {
            const token = await getToken();
            return apiGet<Array<PublicUser>>(
                `users/followed/search/${user?.userId}`,
                undefined,
                token
            );
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!user?.userId && !isLoading,
    });

    if (creatorList.isPending)
        return (
            <div className="grow w-full">
                <p>Loading Follwed Creators...</p>
            </div>
        );

    if (creatorList.error)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {creatorList.error.message}</p>
            </div>
        );

    return (
        <div className="mx-4 w-full">
            <section>
                <h2 className="my-2 select-none cursor-default text-3xl">
                    Followed Creators
                </h2>
            </section>
            <hr className="bg-slate-500/50 h-1 rounded-full my-2" />
            <section className="rounded-4 p-2 shadow-inset-gray-sm">
                <Table className="">
                    <TableHeader className="mb-10">
                        <TableRow className="hover:bg-transparent select-none cursor-default border-tinted_gray_600">
                            <TableHead className="">Creator</TableHead>
                            <TableHead className="">Follower Count</TableHead>
                            <TableHead className="">Following</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {creatorList.data && creatorList.data.length > 0 ? (
                            creatorList.data.map((creator) => {
                                return (
                                    <TableRow
                                        key={creator.userId}
                                        className="hover:bg-transparent"
                                    >
                                        <TableCell>
                                            <Link
                                                href={`/user?id=${creator.userId}`}
                                                className="flex flex-nowrap gap-1 items-center hover:shadow-gray-sm px-2 py-1 active:shadow-inset-gray-sm w-fit h-fit rounded-5"
                                            >
                                                <span className="w-6 h-6 rounded-full bg-slate-500/50">
                                                    {creator.imageUrl &&
                                                        creator.imageUrl !=
                                                            '' &&
                                                        creator.imageUrl !=
                                                            'none' && (
                                                            <Image
                                                                src={
                                                                    creator.imageUrl
                                                                }
                                                                alt={
                                                                    creator.username
                                                                }
                                                            />
                                                        )}
                                                </span>
                                                <p>{creator.username}</p>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="select-none cursor-default">
                                            {formatNumber(
                                                creator.followerCount || 0
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {creator.followed && (
                                                <FollowTile
                                                    isFollowed={
                                                        creator.followed
                                                    }
                                                    creatorId={creator.userId}
                                                    userContext={UserContext}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="select-none cursor-default"
                                >
                                    No Creators Followed!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>
        </div>
    );
}
