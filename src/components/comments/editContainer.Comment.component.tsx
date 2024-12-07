'use client';

import AddComment from './add.Comment.component';
import EditCommentItem from './editItem.Comment.component';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/contexts/User.context';
import { findComments } from '@/utils/FetchHelpers/comments.FetchHelpers';

export default function EditCommentContainer({
    recipeId,
}: {
    recipeId: string | undefined;
}) {
    const { user, loading } = useUserContext();

    const [commentList, setCommentList] = useState<Array<IComment> | undefined>(
        []
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getComments = async () => {
            if (loading || !user || !user.id) return;

            try {
                if (recipeId) {
                    setCommentList(await findComments(recipeId));
                } else {
                    setError('Recipe Id is missing!');
                }
            } catch (error) {
                setError('Error Loading Comments');
            }
        };
        getComments();
    }, []);

    if (loading) {
        return <div>Loading Comments...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grow">
            <h2 className="text-3xl">Comments</h2>
            {user?.id && recipeId != undefined && (
                <AddComment recipeId={recipeId} userId={user.id} />
            )}
            {commentList && commentList.length > 0 ? (
                commentList.map((comment) => (
                    <EditCommentItem
                        comment={comment}
                        commentListUpdater={setCommentList}
                        key={comment.commentId}
                    />
                ))
            ) : (
                <p>No Comments</p>
            )}
        </div>
    );
}
