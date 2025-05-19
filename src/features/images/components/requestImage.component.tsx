'use client';

import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { apiGet } from '@/utils/handlerHelpers';
import LoadingCircle from '@/features/loading/components/loadingCircle.component';
import clsx from 'clsx';

interface imageRequest {
    filename: string;
    priority?: boolean;
    keyId?: string;
    defaultText?: string;
    paddingX_NoImage?: string | undefined;
    paddingY_NoImage?: string | undefined;
}

export default function ImageRequest({
    filename,
    priority = false,
    keyId = '',
    defaultText = 'No Image',
    paddingX_NoImage,
    paddingY_NoImage,
}: imageRequest): ReactNode {
    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchImage = async () => {
        setLoading(true);
        try {
            setImage(await apiGet(`images`, `filename=${filename}`));
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (filename === 'none') {
            setImage('');
            setLoading(false);
            return;
        }

        fetchImage();
    }, [filename]);

    return (
        <div className="w-full h-full relative">
            {loading ? (
                <section>
                    <LoadingCircle />
                </section>
            ) : !filename || filename.length < 1 || !image || image === '' ? (
                <div
                    className={clsx(
                        `w-full h-full bg-tinted_gray_600 flex items-center justify-center text-sm text-white select-none`,
                        paddingX_NoImage && `px-${paddingX_NoImage}`,
                        paddingY_NoImage && `py-${paddingY_NoImage}`
                    )}
                >
                    {defaultText}
                </div>
            ) : (
                <Image
                    key={keyId}
                    className={`select-none`}
                    unoptimized
                    src={image}
                    alt="Profile Image"
                    priority={priority}
                    fill
                />
            )}
        </div>
    );
}
