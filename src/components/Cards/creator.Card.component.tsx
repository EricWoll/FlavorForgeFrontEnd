import { Dispatch, SetStateAction } from 'react';
import FollowTile from '../followtile.component';
import ImageRequest from '../Images/request.image.component';
import Link from 'next/link';

export default function CreatorCard({
    creator,
    creatorListUpdator,
}: {
    creator: CreatorCard;
    creatorListUpdator: Dispatch<SetStateAction<CreatorCard[]>>;
}) {
    const handleFollowTile = async () => {
        creatorListUpdator((prev) => {
            return prev.filter(
                (followedCreator) =>
                    followedCreator.creatorId != creator.creatorId
            );
        });
    };

    return (
        <div className="border-2  max-w-fit max-h-fit p-2 rounded-xl bg-gray-200">
            <section className="flex max-w-64 max-h-64 justify-center mb-2 overflow-hidden">
                {creator.creatorImage !== 'none' ? (
                    <ImageRequest
                        filename={creator.creatorImage}
                        imageWidth={256}
                        imageHeight={256}
                    />
                ) : (
                    <div className=" w-64 h-64 bg-slate-700 rounded-md"></div>
                )}
            </section>
            <section className="flex flex-row justify-center">
                <span className="flex flex-nowrap gap-2 border-2 border-gray-500 pl-2 rounded-full items-center">
                    <Link
                        className="cursor-pointer select-none"
                        href={{
                            pathname: '/creator-page',
                            query: { id: creator.creatorId },
                        }}
                    >
                        {creator.creatorUsername}
                    </Link>
                    <FollowTile
                        isFollowed={true}
                        updateClientFunction={handleFollowTile}
                        creatorId={creator.creatorId}
                    />
                </span>
            </section>
        </div>
    );
}
