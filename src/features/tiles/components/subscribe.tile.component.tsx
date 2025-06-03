'use client';

import FollowIcon from '@/components/svg/followIcon.svg.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiDelete, apiPost } from '@/utils/fetch/apiBase.fetch';
import { useSession, useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { MouseEventHandler, useCallback, useState } from 'react';

export default function FollowTile({
    isFollowed,
    isDisabled,
    creatorId,
}: {
    isFollowed?: boolean;
    isDisabled?: boolean;
    creatorId: string;
}) {
    const { user, isLoaded } = useUser();
    const { session, isSignedIn } = useSession();

    const [isCreatorFollowed, setIsCreatorFollowed] = useState<boolean>(
        isFollowed || false
    );
    const [cooldown, setCooldown] = useState(false);

    const followMutation = useMutation({
        mutationFn: async (followed: boolean) => {
            if (isDisabled || !isLoaded || !isSignedIn || !user || !session)
                return;

            const token = await session.getToken();
            if (!token) return;

            if (followed) {
                return await apiPost(
                    `users/followed/add/${user.id}?creator_id=${creatorId}`,
                    undefined,
                    token
                );
            } else {
                return await apiDelete(
                    `users/followed/delete/${user.id}?creator_id=${creatorId}`,
                    token
                );
            }
        },
        onMutate: (followed: boolean) => {
            setIsCreatorFollowed(followed);
        },
        onError: (_err, followed) => {
            setIsCreatorFollowed(!followed); // revert
            alert('Failed to toggle like.'); // change to a toast
        },
        onSuccess: () => {
            alert('Recipe Liked'); // change to a toast
        },
        onSettled: () => {
            setCooldown(true);
            setTimeout(() => setCooldown(false), 500); // 0.5 seconds cooldown
        },
    });

    const handleUserFollow = useCallback(async () => {
        if (isDisabled || cooldown || followMutation.isPending) return;
        followMutation.mutateAsync(!isCreatorFollowed);
    }, [
        isDisabled,
        cooldown,
        followMutation.isPending,
        isLoaded,
        isSignedIn,
        user,
        session,
        followMutation.mutateAsync, // Here because mutation might be a new reference
        isCreatorFollowed,
    ]);

    return (
        <div
            onClick={handleUserFollow}
            className={clsx('transition-colors', {
                'hover:cursor-pointer':
                    !isDisabled && !followMutation.isPending,
                'hover:cursor-default': isDisabled || followMutation.isPending,
                'opacity-50': followMutation.isPending || cooldown,
            })}
        >
            <FollowIcon
                isFollowed={isCreatorFollowed}
                isDisabled={isDisabled}
            />
        </div>
    );
}
