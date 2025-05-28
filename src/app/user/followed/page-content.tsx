'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useUserContext } from '@/contexts/User.context';
import FollowTile from '@/features/tiles/components/subscribe.tile.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import { apiGet } from '@/utils/fetch/apiBase.fetch';
import formatNumber from '@/utils/numberFormatter';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function FollowedCreatorsContent() {
    const UserContext = useUserContext();

    const creatorList = useQuery({
        queryKey: ['creator_followed'],
        queryFn: () =>
            apiGet<Array<PublicUser>>(
                `users/followed/search/${UserContext.user?.id}`,
                undefined,
                UserContext.user?.token
            ),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!UserContext.user?.id && !UserContext.loading,
    });

    if (creatorList.isPending)
        return (
            <div className="grow w-full">
                <p>Loading recipe...</p>
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
            <h2 className="my-2 select-none cursor-default">
                Followed Creators
            </h2>
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
                        {creatorList.data.length > 0 ? (
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
                                                <span className="w-6 h-6 rounded-full bg-tinted_gray_600">
                                                    <ImageRequest
                                                        filename={
                                                            creator.imageId
                                                        }
                                                        defaultText="N"
                                                    />
                                                </span>
                                                <p>{creator.username}</p>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="select-none cursor-default">
                                            {formatNumber(
                                                creator.followerCount
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {creator.followed && (
                                                <FollowTile
                                                    isFollowed={
                                                        creator.followed
                                                    }
                                                    creatorId={creator.userId}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
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
