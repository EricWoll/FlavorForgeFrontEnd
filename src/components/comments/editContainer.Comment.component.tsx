'use client';

import AddComment from './add.Comment.component';
import { apiGet } from '@/utils/fetchHelpers';
import EditCommentItem from './editItem.Comment.component';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function EditCommentContainer({
    recipeId,
}: {
    recipeId: string | undefined;
}) {
    const { data: session } = useSession();

    const [commentList, setCommentList] = useState<Array<IComment>>([]);

    useEffect(() => {
        const getComments = async () => {
            setCommentList(
                await apiGet(`comments/${recipeId}`, '').then((res) =>
                    res.json()
                )
            );
        };
        getComments();
    }, []);

    return (
        <div className="grow">
            <h2 className="text-3xl">Comments</h2>
            {session?.user.userId && recipeId != undefined && (
                <AddComment recipeId={recipeId} userId={session.user.userId} />
            )}
            {commentList.length > 0 ? (
                commentList.map((comment) => (
                    <EditCommentItem comment={comment} />
                ))
            ) : (
                <p>No Comments</p>
            )}
        </div>
    );
}
