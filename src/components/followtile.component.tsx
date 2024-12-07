'use client';

import { useUserContext } from '@/contexts/User.context';
import {
    addFollower,
    deleteFollower,
} from '@/utils/FetchHelpers/followed.FetchHelpers';
import { apiDelete, apiPostParams } from '@/utils/handlerHelpers';

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
            await deleteFollower(user.id, creatorId, user.token);
            updateClientFunction();
        } catch (error) {
            alert('Could not unFollow Creator');
        }
    };

    const handleFollow = async () => {
        if (!user) return;
        try {
            await addFollower(user.id, creatorId, user.token);

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
