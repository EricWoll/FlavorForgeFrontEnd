'use client';

import FollowTile from '@/features/tiles/components/subscribe.tile.component';

export default function CreatorPageHeader({
    currentCreator,
}: {
    currentCreator: Creator | undefined;
}) {
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
                    <p>3.6M</p>
                    <FollowTile isFollowed={currentCreator?.isFollowed} />
                </div>
            </section>
        </section>
    );
}
