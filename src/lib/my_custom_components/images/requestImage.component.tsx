'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { apiGet } from '@/utils/handlerHelpers';
import LoadingCircle from '@/features/loading/components/loadingCircle.component';
import clsx from 'clsx';

interface ImageRequestProps {
    filename: string;
    priority?: boolean;
    keyId?: string;
    defaultText?: string;
    paddingX_NoImage?: string;
    paddingY_NoImage?: string;
    loadingDisplay?: React.JSX.Element;
}

export default function ImageRequest({
    filename,
    priority = false,
    keyId = '',
    defaultText = 'No Image',
    paddingX_NoImage,
    paddingY_NoImage,
    loadingDisplay = <LoadingCircle />,
}: ImageRequestProps): ReactNode {
    const [imageUrl, setImageUrl] = useState<string>('');

    const {
        data: blob,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['image', filename],
        queryFn: async () => {
            if (filename === 'none') return null;
            return await apiGet<Blob>(
                'images',
                `filename=${filename}`,
                undefined,
                'default',
                'blob'
            );
        },
        enabled: Boolean(filename) && filename !== 'none',
    });

    useEffect(() => {
        if (!blob) {
            setImageUrl('');
            return;
        }
        const url = URL.createObjectURL(blob);
        setImageUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [blob]);

    if (!filename || filename === 'none') {
        // If filename empty or 'none' just show default text immediately
        return (
            <div
                className={clsx(
                    `w-full h-full flex items-center justify-center text-sm text-white select-none`,
                    paddingX_NoImage && `px-${paddingX_NoImage}`,
                    paddingY_NoImage && `py-${paddingY_NoImage}`
                )}
            >
                {defaultText}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                {loadingDisplay}
            </div>
        );
    }

    if (isError || !imageUrl) {
        return (
            <div
                className={clsx(
                    `w-full h-full flex items-center justify-center text-sm text-white select-none`,
                    paddingX_NoImage && `px-${paddingX_NoImage}`,
                    paddingY_NoImage && `py-${paddingY_NoImage}`
                )}
            >
                {defaultText}
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <Image
                key={keyId}
                className="select-none"
                unoptimized
                src={imageUrl}
                alt="Profile Image"
                priority={priority}
                fill
            />
        </div>
    );
}
