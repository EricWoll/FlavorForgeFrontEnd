'use client';

import FollowIcon from '@/components/svg/followIcon.svg.component';
import HeartIcon from '@/components/svg/heartIcon.svg.component';
import { MouseEventHandler, useState } from 'react';

export default function FollowTile({
    isFollowed,
    isDisabled,
}: {
    isFollowed?: boolean;
    isDisabled?: boolean;
}) {
    const [isCreatorFollowed, setIsCreatorFollowed] = useState<boolean>(
        isFollowed || false
    );

    const handleUserFollow = () => {
        setIsCreatorFollowed((prev) => !prev);
        console.log('changed');
        // update database!
    };

    return (
        <FollowIcon
            onClick={handleUserFollow}
            isFollowed={isCreatorFollowed}
            className="hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray p-1 w-fit h-fit rounded-md"
            isDisabled={isDisabled}
        />
    );
}
