import { apiDelete, apiPostParams } from '../handlerHelpers';

export async function addFollower(
    userId: string,
    creatorId: string,
    token: string | undefined
) {
    if (token) {
        await apiPostParams(
            'users/followed',
            `user_id=${userId}&creator_id=${creatorId}`,
            token
        );
    } else {
        throw new Error('No Token!');
    }
}

export async function deleteFollower(
    userId: string,
    creatorId: string,
    token: string | undefined
) {
    if (token) {
        await apiDelete(
            'users/followed',
            token,
            `user_id=${userId}&creator_id=${creatorId}`
        );
    } else {
        throw new Error('No Token!');
    }
}
