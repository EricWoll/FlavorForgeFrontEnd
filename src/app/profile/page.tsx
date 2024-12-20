'use client';

import UserProfile from '@/components/userProfile/userProfile.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const { user, loading } = useUserContext();
    const router = useRouter();

    const [userProfile, setUserProfile] = useState<PublicUser>({
        userId: user?.id || null,
        username: user?.name || '',
        imageId: 'none',
        followerCount: 0,
        aboutText: '',
        role: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading || !user || !user.id) return;

        if (!user?.id) {
            router.push('/'); // Redirect if not logged in
        }

        const getUser = async () => {
            try {
                if (user.name) {
                    const response = await apiGet(
                        `users/${user.name}`,
                        '',
                        user.token
                    );
                    if (!response.ok) {
                        throw new Error(
                            `Failed to fetch User: ${response.statusText}`
                        );
                    }
                    const profileData = await response.json();
                    setUserProfile(profileData);
                } else {
                    setError('Username is missing!');
                }
            } catch (error) {
                setError('Error loading user. Please try again later.');
            }
        };
        getUser();
    }, [user, loading]);

    if (loading) {
        return <div>Loading your Profile...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <UserProfile userProfile={userProfile} />;
}
