'use client';

import AddComment from './add.Comment.component';
import { apiGet } from '@/utils/fetchHelpers';
import EditCommentItem from './editItem.Comment.component';
import CommentItem from './item.Comment.component';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function CommentContainer() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');

    const { data: session } = useSession();

    const [commentList, setCommentList] = useState<
        Array<IComment> | undefined
    >();

    useEffect(() => {
        const getComments = async () => {
            setCommentList(
                await apiGet(`comments/attached/${recipeId}`, '').then((res) =>
                    res.json()
                )
            );
        };

        getComments();
    }, []);

    console.log(commentList);

    return (
        <div className="w-full px-10 mt-5">
            <h2 className="text-2xl rounded-lg bg-gray-600 text-slate-300 p-4 mb-2">
                Comments
            </h2>
            {session?.user.userId && recipeId != undefined && (
                <AddComment recipeId={recipeId} userId={session.user.userId} />
            )}
            {commentList && commentList.length > 0 ? (
                commentList.map((comment) =>
                    comment.userId == session?.user.userId ? (
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
