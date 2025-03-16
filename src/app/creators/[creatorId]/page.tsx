import { dummyCreators } from '@/data/dummyData';
import CreatorPageHeader from './pageHeader.creator';
import CreatorPageContent from './pageContent.creator';

interface CreatorPageProps {
    params: Promise<{
        creatorId: string;
    }>;
}

export default async function CreatorPage({ params }: CreatorPageProps) {
    const { creatorId } = await params;

    const currentCreator = dummyCreators.find((creator) => {
        return creatorId === creator.creatorId;
    });

    return (
        <div className="mx-4 w-full">
            <CreatorPageHeader currentCreator={currentCreator} />
            <CreatorPageContent currentCreator={currentCreator} />
        </div>
    );
}
