'use client';

import { useEffect, useState } from 'react';

export const MaxSmallWindowWidth = 790;
export const MaxMediumWindowWidth = 1400;

export const WindowSizes = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export type WindowSizesType = (typeof WindowSizes)[keyof typeof WindowSizes];

export default function useWindow() {
    const [windowSize, setWindowSize] = useState<WindowSizesType>(
        WindowSizes.LARGE
    );

    useEffect(() => {
        const handleResize = () => {
            if (MaxSmallWindowWidth >= window.innerWidth) {
                setWindowSize(WindowSizes.SMALL);
            } else if (
                MaxSmallWindowWidth < window.innerWidth &&
                window.innerWidth < MaxMediumWindowWidth
            ) {
                setWindowSize(WindowSizes.MEDIUM);
            } else {
                setWindowSize(WindowSizes.LARGE);
            }
        };

        handleResize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return { windowSize };
}
