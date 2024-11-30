'use client';

import RecipeCard from '@/components/Cards/recipe.Card.component';
import FollowTile from '@/components/followtile.component';
import ImageRequest from '@/components/Images/request.image.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const creatorId = searchParams.get('id');
    const router = useRouter();

    const { user, loading } = useUserContext();

    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recipeList, setRecipeList] = useState<Array<RecipeCard>>([]);
    const [creator, setCreator] = useState<ICreator>({
        creatorId: creatorId || '',
        creatorUsername: '',
        creatorImageId: 'none',
        followerCount: 0,
        creatorAboutText: '',
        creatorRole: '',
        followed: false,
    });

    const handleGetCreator = async (user: IUserContextPublic | null) => {
        if (user?.id) {
            return await apiGet(
                `users/creator/${creatorId}`,
                `user_id=${user.id}`,
                user.token
            );
        } else {
            return await apiGet(`users/id/${creatorId}`);
        }
    };

    const getCreatorPageContent = async () => {
        setPageLoading(true);
        try {
            const recipeResponse = await apiGet(`recipes/users/${creatorId}`);
            if (!recipeResponse.ok)
                throw new Error("Error fetching creator's recipes.");

            const recipeData = await recipeResponse.json();
            setRecipeList(recipeData);

            const creatorResponse = await handleGetCreator(user);
            if (!creatorResponse.ok)
                throw new Error('Error fetching creator data.');

            const creatorData = await creatorResponse.json();
            setCreator(creatorData);
        } catch (error) {
            setError(
                'Failed to load Creator and their Recipes. Please try again later.'
            );
        } finally {
            setPageLoading(false);
        }
    };

    const toggleFollowStatus = async () => {
        setCreator({
            ...creator,
            followed: !creator.followed,
        });
    };

    useEffect(() => {
        if (!creatorId) {
            router.push('/');
        }
        if (loading) return;
        getCreatorPageContent();
    }, [loading, user, creatorId]);

    if (pageLoading) {
        return <div>Loading Recipe...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow">
            <section className="flex flex-wrap gap-4 p-4">
                {creator.creatorImageId !== 'none' && creator.creatorImageId ? (
                    <ImageRequest
                        filename={creator.creatorImageId}
                        imageWidth={128}
                        imageHeight={128}
                    />
                ) : (
                    <div
                        className="w-32 h-32 bg-slate-700 rounded-md"
                        aria-label="Placeholder image"
                    ></div>
                )}
                <section className="flex flex-col gap-3">
                    <h2 className="text-3xl font-semibold">
                        {creator.creatorUsername || creator?.username}
                    </h2>
                    {user && (
                        <span className="max-w-fit max-h-fit">
                            <FollowTile
                                isFollowed={creator.followed}
                                updateClientFunction={toggleFollowStatus}
                                creatorId={creator.creatorId}
                            />
                        </span>
                    )}
                    <p className="text-gray-500">
                        {creator.creatorAboutText ||
                            'No About Section Available'}
                    </p>
                </section>
            </section>
            <hr />
            <section className="flex flex-wrap gap-4 justify-center">
                {recipeList.length > 0 ? (
                    recipeList.map((recipe) => (
                        <RecipeCard key={recipe.recipeId} card={recipe} />
                    ))
                ) : (
                    <p>This creator does not have any recipes!</p>
                )}
            </section>
        </div>
    );
}
