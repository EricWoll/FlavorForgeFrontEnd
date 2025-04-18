'use client';

import FollowIcon from '@/components/svg/followIcon.svg.component';
import HeartIcon from '@/components/svg/heartIcon.svg.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
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
        if (!isDisabled) {
            setIsCreatorFollowed((prev) => !prev);
            // update database!
        }
    };

    return (
        <Button.Hover
            onClick={handleUserFollow}
            isDisabled={isDisabled}
            className="p-0 px-1"
        >
            <FollowIcon
                isFollowed={isCreatorFollowed}
                isDisabled={isDisabled}
            />
        </Button.Hover>
    );
}
