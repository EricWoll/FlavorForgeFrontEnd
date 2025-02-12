// app/creators/[creatorId]/page.tsx

interface CreatorPageProps {
    params: Promise<{
        creatorId: string; // creatorId is directly a string from the dynamic route
    }>;
}

export default async function CreatorPage({ params }: CreatorPageProps) {
    const { creatorId } = await params; // creatorId is a string, no need for Promise or await

    return (
        <div>
            <h1>Creator Page</h1>
            <p>{creatorId}</p> {/* Displays creatorId from the dynamic route */}
        </div>
    );
}
