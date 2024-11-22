'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormColumn } from '../FormElements/column.Form.component';
import FormContainer from '../FormElements/container.Form.component';
import FormTextArea from '../FormElements/textArea.Form.component';
import { useSession } from 'next-auth/react';
import { apiPost } from '@/utils/fetchHelpers';

export default function AddComment({
    recipeId,
    userId,
}: {
    recipeId: string | undefined;
    userId: string;
}) {
    const { data: session } = useSession();

    const [commentText, setCommentText] = useState<string>('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (commentText != '') {
            await apiPost(
                `comments`,
                {
                    userId: userId,
                    attachedId: recipeId,
                    commentText: commentText,
                },
                session?.user.accessToken
            );
            setCommentText('');
        }
    };

    return (
        <FormContainer method="post" onSubmit={handleSubmit}>
            <FormColumn>
                <FormTextArea
                    label="Add Comment"
                    value={commentText}
                    onChange={(event) => {
                        setCommentText(event.target.value);
                    }}
                />
                <FormButton buttonText="Comment" type="submit" />
            </FormColumn>
        </FormContainer>
    );
}
