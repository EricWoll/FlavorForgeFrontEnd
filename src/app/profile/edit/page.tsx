'use client';

import EditUserProfile from '@/components/userProfile/editUserProfile.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const { user, loading } = useUserContext();
    const router = useRouter();

    const [userProfile, setUserProfile] = useState<EditUser>({
        userId: null,
        username: '',
        email: '',
        password: '',
        imageId: 'none',
        followerCount: 0,
        aboutText: '',
        role: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading) return;

        if (!user?.id) {
            router.push('/'); // Redirect if not logged in
            return;
        }

        const getUser = async () => {
            try {
                if (user.name) {
                    const response = await apiGet(
                        `users/edit/${user.name}`,
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
                }
            } catch (error) {
                setError('Error Loading User. Please try again later.');
            }
        };

        getUser();
    }, [user, loading]);

    if (loading) {
        return <div>Loading your Profile...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow mx-4">
            <EditUserProfile
                userProfile={userProfile}
                setUserProfile={setUserProfile}
            />
        </div>
    );
}
