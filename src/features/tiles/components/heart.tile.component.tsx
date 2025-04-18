'use client';

import HeartIcon from '@/components/svg/heartIcon.svg.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { MouseEventHandler, useState } from 'react';

export default function HeartTile({
    isLiked,
    isDisabled,
}: {
    isLiked?: boolean;
    isDisabled?: boolean;
}) {
    const [isRecipeLiked, setIsRecipeLiked] = useState<boolean>(
        isLiked || false
    );

    const handleRecipeLike = () => {
        setIsRecipeLiked((prev) => !prev);
        // update database!
    };

    return (
        <Button.Hover
            onClick={handleRecipeLike}
            isDisabled={isDisabled}
            className="p-[.1rem]"
        >
            <HeartIcon isLiked={isRecipeLiked} isDisabled={isDisabled} />
        </Button.Hover>
    );
}
