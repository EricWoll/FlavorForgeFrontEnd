'use client';

import RecipeCard, { RecipeCardSkeleton } from './recipe.card.component';
import { useEffect, Fragment } from 'react';
import GoogleAdFixed from '@/features/googleAdsense/googleAd.Adsense.component';
import { useUser } from '@clerk/nextjs';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';

interface RecipeContainerProps {
    recipeList: Array<RecipeWithCreator> | undefined;
    recipesPending: boolean;
    recipesError: Error | null;
    showCreatorIcon?: boolean;
    containsAds?: boolean;
}

export default function RecipeContainer({
    showCreatorIcon = true,
    containsAds = true,
    ...props
}: RecipeContainerProps) {
    const { user, isLoaded, isSignedIn } = useUser();
    const Window = useWindow();

    const MAX_RECIPE_SKELETONS = Window.windowSize.match(WindowSizes.LARGE)
        ? 8
        : Window.windowSize.match(WindowSizes.MEDIUM)
        ? 4
        : 1;

    if (props.recipesPending) {
        return (
            <div className="flex gap-4 flex-wrap justify-center pb-4">
                {Array.from({ length: MAX_RECIPE_SKELETONS }).map(
                    (_, index) => (
                        <RecipeCardSkeleton key={index} />
                    )
                )}
            </div>
        );
    }

    if (!props.recipeList || props.recipeList.length < 1) {
        return (
            <div className="flex gap-4 flex-wrap justify-center pb-4">
                <p className="text-primary/50 select-none text-3xl h-fit">
                    No recipes found!
                </p>
            </div>
        );
    }

    return (
        <div className={`flex gap-4 flex-wrap justify-center pb-4`}>
            {props.recipeList.map(
                (recipe: RecipeWithCreator, index: number) => (
                    <Fragment key={recipe.recipeId}>
                        <RecipeCard
                            recipe={recipe}
                            isLikeDisabled={
                                !isLoaded ||
                                user?.id === recipe.creatorId ||
                                !isSignedIn
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
