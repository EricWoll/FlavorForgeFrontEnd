import FollowedUsersPageContent from './followedUsersContent.page';

interface Props {
    params: { userId: string };
}

export default async function FollowedUsersPage({ params }: Props) {
    const { userId } = await params;
    return <FollowedUsersPageContent userId={userId} />;
}
