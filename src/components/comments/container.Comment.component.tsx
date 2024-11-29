'use client';

import AddComment from './add.Comment.component';
import { apiGet } from '@/utils/fetchHelpers';
import EditCommentItem from './editItem.Comment.component';
import CommentItem from './item.Comment.component';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useUserContext } from '@/contexts/User.context';

export default function CommentContainer() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const { user } = useUserContext();

    const [commentList, setCommentList] = useState<
        Array<IComment> | undefined
    >();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getComments = async () => {
            try {
                setLoading(true);
                if (recipeId) {
                    const response = await apiGet(
                        `comments/attached/${recipeId}`
                    );
                    if (!response.ok) {
                        throw new Error(
                            `Failed to fetch Comments: ${response.statusText}`
                        );
                    }
                    const commentData = await response.json();
                    setCommentList(commentData);
                } else {
                    setError('Recipe Id is missing!');
                }
            } catch (error) {
                setError('Error loading Comments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getComments();
    }, [recipeId]);

    if (loading) {
        return <div>Loading Comments...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="w-full px-10 mt-5">
            <h2 className="text-2xl rounded-lg bg-gray-600 text-slate-300 p-4 mb-2">
                Comments
            </h2>
            {user?.userId && recipeId != undefined && (
                <AddComment recipeId={recipeId} userId={user.userId} />
            )}
            {commentList && commentList.length > 0 ? (
                commentList.map((comment) =>
                    comment.userId == user?.userId ? (
                        <EditCommentItem
                            key={comment.commentId}
                            comment={comment}
                            commentListUpdater={setCommentList}
                        />
                    ) : (
                        <CommentItem
                            key={comment.commentId}
                            comment={comment}
                        />
                    )
                )
            ) : (
                <p className="mx-5 mb-4 text-gray-400 rounded-md border-2 border-gray-200 border-stroke p-2">
                    No Comments
                </p>
            )}
        </div>
    );
}
