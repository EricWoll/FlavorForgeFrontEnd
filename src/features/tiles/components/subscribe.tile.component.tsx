'use client';

import FollowIcon from '@/components/svg/followIcon.svg.component';
import { IUserContext } from '@/contexts/user.context';
import { apiDelete, apiPost } from '@/utils/fetch/apiBase.fetch';
import { useSession, useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { MouseEventHandler, useCallback, useState } from 'react';

interface FollowTileProps {
    isFollowed?: boolean;
    isDisabled?: boolean;
    creatorId: string;
    userContext: IUserContext;
}

export default function FollowTile({
    isFollowed,
    isDisabled,
    creatorId,
    userContext,
}: FollowTileProps) {
    const { user, isLoading, isAuthenticated, getToken } = userContext;

    const [isCreatorFollowed, setIsCreatorFollowed] = useState<boolean>(
        isFollowed || false
    );
    const [cooldown, setCooldown] = useState(false);

    const followMutation = useMutation({
        mutationFn: async (followed: boolean) => {
            if (isDisabled || isLoading || !isAuthenticated || !user) return;

            const token = await getToken();
            if (!token) return;

            if (followed) {
                return await apiPost(
                    `users/followed/add/${user.userId}?creator_id=${creatorId}`,
                    undefined,
                    token
                );
            } else {
                return await apiDelete(
                    `users/followed/delete/${user.userId}?creator_id=${creatorId}`,
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
        isLoading,
        isAuthenticated,
        user,
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
