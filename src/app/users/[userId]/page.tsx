import UserProfileContent from './userProfileContent.page';

interface Props {
    params: { userId: string };
}

export default async function UserProfile({ params }: Props) {
    const { userId } = await params;
    // Nothing to await here—this structure is fine
    return <UserProfileContent creatorId={userId} />;
}
