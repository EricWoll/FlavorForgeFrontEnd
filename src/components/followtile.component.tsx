'use client';

import { useUserContext } from '@/contexts/User.context';
import { apiDelete, apiPostParams } from '@/utils/fetchHelpers';
import Link from 'next/link';

export default function FollowTile({
    isFollowed,
    updateClientFunction,
    creatorId,
    creatorName,
}: {
    isFollowed: boolean | undefined;
    updateClientFunction: () => {};
    creatorId: string;
    creatorName: string;
}) {
    const { user } = useUserContext();

    const handleUnFollow = async () => {
        if (!user) return;
        try {
            await apiDelete(
                'users/followed',
                user.token,
                `user_id=${user.id}&creator_id=${creatorId}`
            );
            updateClientFunction();
        } catch (error) {
            alert('Could not unFollow Creator');
        }
    };

    const handleFollow = async () => {
        if (!user) return;
        try {
            await apiPostParams(
                'users/followed',
                `user_id=${user.id}&creator_id=${creatorId}`,
                user.token
            );

            updateClientFunction();
        } catch (error) {
            alert('Could not Follow Creator');
        }
    };

    return (
        <>
            {isFollowed ? (
                <section className="flex flex-wrap items-center gap-2 rounded-full border-2 border-gray-300 max-w-fit max-h-fit pl-2">
                    <Link
                        href={{
                            pathname: '/creator-page',
                            query: { id: creatorId },
                        }}
                        className="select-none cursor-pointer"
                    >
                        {creatorName}
                    </Link>

                    <p
                        onClick={handleUnFollow}
                        className="bg-gray-600 text-gray-300 py-1 px-3 rounded-full cursor-pointer select-none"
                    >
                        Followed
                    </p>
                </section>
            ) : (
                <section className="flex flex-wrap items-center gap-2 rounded-full border-2 max-w-fit pl-2">
                    <p>{creatorName}</p>
                    <p
                        onClick={handleFollow}
                        className="bg-gray-600 text-gray-300 py-1 px-3 rounded-full max-w-fit cursor-pointer select-none"
                    >
                        Follow
                    </p>
                </section>
            )}
        </>
    );
}
