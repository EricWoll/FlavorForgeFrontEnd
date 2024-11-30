'use client';

import CreatorCard from '@/components/Cards/creator.Card.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const { user, loading } = useUserContext();
    const router = useRouter();

    const [creatorList, setCreatorList] = useState<Array<CreatorCard>>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading || !user) return;

        if (!user?.id) {
            router.push('/'); // Redirect if not logged in
            return;
        }
        const getCreators = async () => {
            try {
                const response = await apiGet(
                    `users/followed/${user.id}`,
                    '',
                    user.token
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch Followed Creators: ${response.statusText}`
                    );
                }
                const creatorData: CreatorCard[] = await response.json();
                setCreatorList(creatorData);
            } catch (error: unknown) {
                console.error('Error fetching creators:', error);
                setError(
                    'Error Loading Followed Creators. Please try again later.'
                );
            }
        };

        getCreators();
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading your Creators...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow flex flex-wrap m-5 gap-4">
            {creatorList.length > 0 ? (
                creatorList.map((creator) => (
                    <CreatorCard
                        key={creator.creatorId}
                        creator={creator}
                        creatorListUpdator={setCreatorList}
                    />
                ))
            ) : (
                <p>No Creators Followed</p>
            )}
        </div>
    );
}
