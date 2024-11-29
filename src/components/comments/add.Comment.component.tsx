'use client';

import { FormEvent, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormColumn } from '../FormElements/column.Form.component';
import FormContainer from '../FormElements/container.Form.component';
import FormTextArea from '../FormElements/textArea.Form.component';
import { apiPost } from '@/utils/fetchHelpers';
import { useUserContext } from '@/contexts/User.context';

export default function AddComment({
    recipeId,
    userId,
}: {
    recipeId: string | undefined;
    userId: string;
}) {
    const { user } = useUserContext();

    const [commentText, setCommentText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (commentText != '') {
                await apiPost(
                    `comments`,
                    {
                        userId: userId,
                        attachedId: recipeId,
                        commentText: commentText,
                    },
                    user?.token
                );
                setCommentText('');
            } else {
                setError('No comment to submit!');
            }
        } catch (error) {
            setError('Error Submitting Comment!');
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
                {error && <p>{error}</p>}
                <FormButton buttonText="Comment" type="submit" />
            </FormColumn>
        </FormContainer>
    );
}
