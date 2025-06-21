import LikedRecipesPageContent from './likedRecipesContent.page';

interface Props {
    params: { userId: string };
}

export default async function LikedRecipesPage({ params }: Props) {
    const { userId } = await params;
    return <LikedRecipesPageContent userId={userId} />;
}
