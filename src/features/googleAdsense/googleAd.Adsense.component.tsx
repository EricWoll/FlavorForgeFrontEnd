'use client';

import { useEffect, useRef } from 'react';

type Props = {
    adSlot: string;
    width: number;
    height: number;
};

export default function GoogleAdFixed({ adSlot, width, height }: Props) {
    const adRef = useRef<HTMLDivElement | null>(null);
    const pushedRef = useRef(false);

    useEffect(() => {
        if (!pushedRef.current && adRef.current) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                pushedRef.current = true;
            } catch (e) {
                console.error('Adsense error:', e);
            }
        }
    }, []);

    const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

    if (!adClient) {
        console.warn(
            'Ad client not defined. Check NEXT_PUBLIC_ADSENSE_CLIENT in .env file.'
        );
        return null;
    }

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: 'inline-block',
                width: `${width}px`,
                height: `${height}px`,
            }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
        ></ins>
    );
}
