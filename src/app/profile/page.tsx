import UserProfile from '@/components/userProfile/userProfile.component';
import { authOptions } from '@/utils/authOptions';
import { apiGet } from '@/utils/fetchHelpers';
import serverAuthRedirect from '@/utils/serverAuthRedirect';
import { getServerSession } from 'next-auth';

export default async function Page() {
    await serverAuthRedirect(['FREE']);

    const session = await getServerSession(authOptions);

    const userProfile = await apiGet(
        `users/${session?.user.username}`,
        ''
    ).then((res) => res.json());

    return <UserProfile userProfile={userProfile} />;
}
