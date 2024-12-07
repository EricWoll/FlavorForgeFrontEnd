'use client';

import { useUserContext } from '@/contexts/User.context';
import { deleteComment } from '@/utils/FetchHelpers/comments.FetchHelpers';
import { findUserById } from '@/utils/FetchHelpers/users.FetchHelpers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function EditCommentItem({
    comment,
    commentListUpdater,
}: {
    comment: IComment;
    commentListUpdater: Dispatch<SetStateAction<Array<IComment> | undefined>>;
}) {
    const { user, loading } = useUserContext();
    const [publicUser, setPublicUser] = useState<PublicUser>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading || !user || !user.id) return;

        const getUser = async () => {
            try {
                if (comment.userId) {
                    setPublicUser(await findUserById(comment.userId));
                } else {
                    setError("Comment's user data is missing!");
                }
            } catch (error) {
                setError('Failed to fetch user! Please try again later.');
            }
        };
        getUser();
    }, []);

    const handleDelete = async (commentToRemove: IComment) => {
        try {
            if (user?.token) {
                await deleteComment(commentToRemove.commentId, user.token);
                commentListUpdater((prevItems) =>
                    prevItems?.filter((item) => item != commentToRemove)
                );
            } else {
                setError('Failed to delete Comment.');
            }
        } catch (error) {
            setError('Failed to delete Comment.');
        }
    };

    if (loading) {
        return <div>Loading Comment...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="my-4 w-full rounded-md border-2 border-stroke p-2">
            <section>
                <p>{publicUser?.username}</p>
            </section>
            <hr className="" />
            <section className="m-2 w-full">
                <p>{comment.commentText}</p>
            </section>
            <section className="grid items-start w-fit">
                <p
                    onClick={() => {
                        handleDelete(comment);
                    }}
                    className="rounded-md bg-slate-400 text-slate-900 px-3 hover:bg-slate-600 hover:text-slate-200 select-none cursor-pointer"
                >
                    Delete
                </p>
            </section>
        </div>
    );
}
