'use client';

import { useUserContext } from '@/contexts/User.context';
import { apiDelete, apiPostParams } from '@/utils/fetchHelpers';

export default function FollowTile({
    isFollowed,
    updateClientFunction,
    creatorId,
}: {
    isFollowed: boolean | undefined;
    updateClientFunction: () => Promise<void>;
    creatorId: string;
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
            {user?.id !== creatorId &&
                (isFollowed ? (
                    <p
                        onClick={handleUnFollow}
                        className="bg-gray-600 text-gray-300 py-1 px-3 rounded-full cursor-pointer select-none"
                    >
                        Followed
                    </p>
                ) : (
                    <p
                        onClick={handleFollow}
                        className="bg-gray-600 text-gray-300 py-1 px-3 rounded-full max-w-fit cursor-pointer select-none"
                    >
                        Follow
                    </p>
                ))}
        </>
    );
}
