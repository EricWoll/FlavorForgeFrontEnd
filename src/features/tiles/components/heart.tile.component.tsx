'use client';

import { useUserContext } from '@/contexts/User.context';
import { apiDelete, apiPost } from '@/utils/fetch/apiBase.fetch';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { Heart } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface HeartTileProps {
    isLiked?: boolean;
    isDisabled?: boolean;
    recipeId: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function HeartTile({
    isLiked = false,
    isDisabled = false,
    recipeId,
    size = 'sm',
}: HeartTileProps) {
    const { user, loading } = useUserContext();
    const [isRecipeLiked, setIsRecipeLiked] = useState(isLiked);
    const [cooldown, setCooldown] = useState(false);

    useEffect(() => {
        setIsRecipeLiked(isLiked);
    }, [isLiked]);

    const likeMutation = useMutation({
        mutationFn: async (liked: boolean) => {
            if (isDisabled || (!user?.id && !user?.token) || loading) return;
            if (liked) {
                return await await apiPost(
                    `recipes/liked/${user.id}?recipe_id=${recipeId}`,
                    undefined,
                    user.token
                );
            } else {
                return await apiDelete(
                    `recipes/liked/${user.id}?recipe_id=${recipeId}`,
                    user.token
                );
            }
        },
        onMutate: (liked: boolean) => {
            setIsRecipeLiked(liked);
        },
        onError: (_err, liked) => {
            setIsRecipeLiked(!liked); // revert
            alert('Failed to toggle like.');
        },
        onSettled: () => {
            setCooldown(true);
            setTimeout(() => setCooldown(false), 1000); // 1 seconds cooldown
        },
    });

    const handleClick = useCallback(async () => {
        if (isDisabled || cooldown || likeMutation.isPending) return;
        await likeMutation.mutateAsync(!isRecipeLiked);
    }, [isDisabled, cooldown, likeMutation, isRecipeLiked]);

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
