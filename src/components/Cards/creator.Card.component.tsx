import { Dispatch, SetStateAction } from 'react';
import FollowTile from '../followtile.component';
import ImageRequest from '../Images/request.image.component';

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
            <section className="flex w-full justify-center mb-2">
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
                <FollowTile
                    isFollowed={true}
                    updateClientFunction={handleFollowTile}
                    creatorId={creator.creatorId}
                    creatorName={creator.creatorUsername}
                />
            </section>
        </div>
    );
}
