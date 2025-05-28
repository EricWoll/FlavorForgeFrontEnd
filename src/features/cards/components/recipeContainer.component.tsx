'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeCard from './recipe.card.component';
import { useEffect, Fragment } from 'react';
import GoogleAdFixed from '@/features/googleAdsense/googleAd.Adsense.component';

interface RecipeContainerProps {
    recipeList: Array<RecipeWithCreator> | null;
    showCreatorIcon?: boolean;
    containsAds?: boolean;
}

export default function RecipeContainer({
    showCreatorIcon = true,
    containsAds = true,
    ...props
}: RecipeContainerProps) {
    const userContext = useUserContext();

    if (!props.recipeList) {
        return <div>No recipes found.</div>;
    }

    const isLoggedIn = !!userContext.user?.id;

    return (
        <div className={`flex gap-4 flex-wrap justify-center pb-4`}>
            {props.recipeList.map(
                (recipe: RecipeWithCreator, index: number) => (
                    <Fragment key={recipe.recipeId}>
                        <RecipeCard
                            recipe={recipe}
                            isLikeDisabled={
                                userContext.loading ||
                                userContext.user?.id === recipe.creatorId ||
                                !isLoggedIn
                            }
                            showCreatorIcon={showCreatorIcon}
                        />

                        {/* Insert ad after every 6th card */}
                        {containsAds && (index + 1) % 6 === 0 && (
                            <div
                                key={`ad-${index}`}
                                className="w-full flex justify-center py-4"
                            >
                                {/* Change out "adSlot with actual adSlot id" */}
                                <GoogleAdFixed
                                    adSlot="1234567890"
                                    width={300}
                                    height={250}
                                />
                            </div>
                        )}
                    </Fragment>
                )
            )}
        </div>
    );
}
