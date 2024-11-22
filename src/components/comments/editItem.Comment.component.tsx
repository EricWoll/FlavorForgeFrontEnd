'use client';

import { apiDelete, apiGet } from '@/utils/fetchHelpers';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function EditCommentItem({
    comment,
    commentListUpdater,
}: {
    comment: IComment;
    commentListUpdater: Dispatch<SetStateAction<Array<IComment> | undefined>>;
}) {
    const { data: session } = useSession();
    const [publicUser, setPublicUser] = useState<PublicUser>();

    useEffect(() => {
        const getUser = async () => {
            setPublicUser(
                await apiGet(`users/id/${comment.userId}`, '').then((res) =>
                    res.json()
                )
            );
        };
        getUser();
    }, []);

    const handleDelete = async (commentToRemove: IComment) => {
        await apiDelete(
            `comments/${comment.commentId}`,
            session?.user.accessToken
        );
        commentListUpdater((prevItems) =>
            prevItems?.filter((item) => item != commentToRemove)
        );
    };

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
