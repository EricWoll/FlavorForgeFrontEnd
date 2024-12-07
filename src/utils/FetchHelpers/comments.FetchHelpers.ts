import { apiDelete, apiGet, apiPost } from '../handlerHelpers';

export async function postComments(
    userId: string,
    attachedId: string | undefined,
    commentText: string,
    token: string | undefined
) {
    if (token && attachedId) {
        await apiPost(
            `comments`,
            {
                userId: userId,
                attachedId: attachedId,
                commentText: commentText,
            },
            token
        );
    } else {
        throw new Error('No token or attached Id!');
    }
}

export async function findComments(recipeId: string) {
    const response = await apiGet(`comments/attached/${recipeId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Comments: ${response.statusText}`);
    }
    return await response.json();
}

export async function deleteComment(commentId: string, token: string) {
    await apiDelete(`comments/${commentId}`, token);
}
