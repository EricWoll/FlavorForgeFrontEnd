'use client';

import { useState } from 'react';
import CommentsItem from './item.comments.components';

export default function CommentsContainer() {
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

    const handleCommentsContainerClick = () => {
        setIsCommentsOpen((prev) => !prev);
    };

    /* Load Comments Only When isCommentsOpen == true */
    const userCommentsList: any[] = [{ text: '', id: 1 }];

    return (
        <section>
            <div
                onClick={handleCommentsContainerClick}
                className="cursor-pointer flex flex-nowrap justify-between mb-4 px-2 py-2 shadow-popout_tinted_gray active:shadow-popin_tinted_gray rounded-md text-tinted_gray_300"
            >
                <h2 className="select-none">Comments</h2>
                <p className="select-none">Arrow</p>
            </div>
            {isCommentsOpen &&
                userCommentsList.map((comment) => (
                    <CommentsItem key={comment.id} comment={comment} />
                ))}
        </section>
    );
}
