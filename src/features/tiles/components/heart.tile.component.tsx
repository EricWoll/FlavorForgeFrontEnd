'use client';

import { IUserContext, useUserContext } from '@/contexts/user.context';
import { apiDelete, apiPost } from '@/utils/fetch/apiBase.fetch';
import { useSession, useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { Heart } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface HeartTileProps {
    isLiked?: boolean;
    isDisabled?: boolean;
    recipeId: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    userContext: IUserContext;
}

export default function HeartTile({
    isLiked = false,
    isDisabled = false,
    recipeId,
    size = 'sm',
    userContext,
}: HeartTileProps) {
    const { user, isLoading, isAuthenticated, getToken } = userContext;

    const [isRecipeLiked, setIsRecipeLiked] = useState(isLiked);
    const [cooldown, setCooldown] = useState(false);

    useEffect(() => {
        setIsRecipeLiked(isLiked);
    }, [isLiked]);

    const likeMutation = useMutation({
        mutationFn: async (liked: boolean) => {
            if (isDisabled || isLoading || !isAuthenticated || !user) return;

            const token = await getToken();
            if (!token) return;

            if (liked) {
                return await await apiPost(
                    `recipes/liked/add/${user.userId}?recipe_id=${recipeId}`,
                    undefined,
                    token
                );
            } else {
                return await apiDelete(
                    `recipes/liked/delete/${user.userId}?recipe_id=${recipeId}`,
                    token
                );
            }
        },
        onMutate: (liked: boolean) => {
            setIsRecipeLiked(liked);
        },
        onError: (_err, liked) => {
            setIsRecipeLiked(!liked); // revert
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

    const handleClick = useCallback(async () => {
        if (isDisabled || cooldown || likeMutation.isPending) return;
        await likeMutation.mutateAsync(!isRecipeLiked);
    }, [
        isDisabled,
        cooldown,
        likeMutation.isPending,
        isLoading,
        isAuthenticated,
        user,
        likeMutation.mutateAsync, // Here because mutation might be a new reference
        isRecipeLiked,
    ]);

    return (
        <div
            className={clsx('transition-colors', {
                'hover:cursor-pointer': !isDisabled && !likeMutation.isPending,
                'hover:cursor-default': isDisabled || likeMutation.isPending,
                'opacity-50': likeMutation.isPending || cooldown,
            })}
            onClick={handleClick}
        >
            <Heart
                className={clsx(
                    ' text-tinted_gray_500',
                    size === 'sm' && 'h-5 w-5',
                    size === 'md' && 'h-6 w-6',
                    size === 'lg' && 'h-7 w-7',
                    size === 'xl' && 'h-8 w-8',
                    size === '2xl' && 'h-9 w-9'
                )}
                fill={
                    isDisabled
                        ? '#939EA7'
                        : isRecipeLiked
                        ? '#CA2C3F'
                        : 'transparent'
                }
            />
        </div>
    );
}
