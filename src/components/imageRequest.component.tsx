'use client';

import { apiGet } from '@/utils/fetchHelpers';
import { useEffect, useState } from 'react';
import LoadingCircle from './loadingCircle.component';
import Image from 'next/image';

interface imageRequest {
    filename: string;
    imageWidth: number;
    imageHeight: number;
    priority?: boolean;
}

export default function ImageRequest({
    filename,
    imageWidth,
    imageHeight,
    priority = false,
}: imageRequest) {
    const [image, setImage] = useState<Response>(new Response());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            try {
                setImage(await apiGet(`images`, `filename=${filename}`));
            } catch (e) {
                console.log(e);
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
            ) : (
                <Image
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
