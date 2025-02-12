interface CreatorPageProps {
    params: {
        creatorId: string;
    };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
    const { creatorId } = await params;
    return (
        <div>
            <h1>Creator Page</h1>
            <p>{creatorId}</p>
        </div>
    );
}
