'use client';

import { apiGet } from '@/utils/handlerHelpers';
import { ReactNode, useEffect, useState } from 'react';
import LoadingCircle from './loadingCircle.image.component';
import Image from 'next/image';
import { findImage } from '@/utils/FetchHelpers/images.FetchHelpers';

interface imageRequest {
    filename: string;
    imageWidth: number;
    imageHeight: number;
    priority?: boolean;
    keyId?: string;
}

export default function ImageRequest({
    filename,
    imageWidth,
    imageHeight,
    priority = false,
    keyId = '',
}: imageRequest): ReactNode {
    const [image, setImage] = useState<Response>(new Response());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            try {
                setImage(await findImage(filename));
            } catch (error) {
                setError('Failed to fetch image!');
            }
            setLoading(false);
        };
        fetchImage();
    }, [filename]);
    return (
        <>
            {loading ? (
                <section>
                    <LoadingCircle />
                </section>
            ) : error ? (
                <section className="text-sm">{error}</section>
            ) : (
                <Image
                    key={keyId}
                    className="select-none"
                    unoptimized
                    src={image.url}
                    width={imageWidth}
                    height={imageHeight}
                    alt="Profile Image"
                    priority={priority}
                />
            )}
        </>
    );
}
