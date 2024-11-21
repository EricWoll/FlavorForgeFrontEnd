import EditUserProfile from '@/components/userProfile/editUserProfile.component';
import { authOptions } from '@/utils/authOptions';
import { apiGet } from '@/utils/fetchHelpers';
import serverAuthRedirect from '@/utils/serverAuthRedirect';
import { getServerSession } from 'next-auth';

export default async function Page() {
    await serverAuthRedirect(['FREE']);

    const session = await getServerSession(authOptions);

    const userProfile = await apiGet(
        `users/edit/${session?.user.username}`,
        '',
        session?.user.accessToken
    ).then((res) => res.json());

    return <EditUserProfile userProfile={userProfile} />;
}
