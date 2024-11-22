'use client';

import { apiGet } from '@/utils/fetchHelpers';
import { useEffect, useState } from 'react';

export default function CommentItem({ comment }: { comment: IComment }) {
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

    return (
        <div className="my-4 w-full rounded-md border-2 border-stroke p-2">
            <section>
                <p>{publicUser?.username}</p>
            </section>
            <hr className="" />
            <section className="m-2 bg-gray-200 p-2 rounded-md">
                <p>{comment.commentText}</p>
            </section>
        </div>
    );
}
