'use client';

import { useUserContext } from '@/contexts/User.context';
import FollowTile from '@/features/tiles/components/subscribe.tile.component';

export default function CreatorPageHeader({
    currentCreator,
}: {
    currentCreator: Creator | undefined;
}) {
    const UserContext = useUserContext();

    return (
        <section className="flex gap-2">
            <img
                src={currentCreator?.creatorIcon}
                className="h-[100px] w-[100px] object-cover rounded-lg"
            />
            <section className="flex flex-col justify-center">
                <h2 className="font-bold text-2xl">
                    {currentCreator?.creatorName}
                </h2>
                <div className="flex flex-nowrap gap-2">
                    <p className="text-tinted_gray_300">3.6M</p>
                    <FollowTile
                        isFollowed={currentCreator?.isFollowed}
                        isDisabled={
                            UserContext.user == null ||
                            UserContext.user.id == currentCreator?.creatorId
                        }
                    />
                </div>
            </section>
        </section>
    );
}
