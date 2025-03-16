'use client';

import HeartIcon from '@/components/svg/heartIcon.svg.component';
import { MouseEventHandler, useState } from 'react';

export default function HeartTile({ isLiked }: { isLiked?: boolean }) {
    const [isRecipeLiked, setIsRecipeLiked] = useState<boolean>(
        isLiked || false
    );

    const handleRecipeLike = () => {
        setIsRecipeLiked((prev) => !prev);
        // update database!
    };

    return (
        <HeartIcon
            onClick={handleRecipeLike}
            isLiked={isRecipeLiked}
            className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray p-1 w-fit h-fit rounded-md"
        />
    );
}
