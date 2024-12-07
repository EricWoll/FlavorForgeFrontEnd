import { apiGet } from '../handlerHelpers';

export async function findFollowedCreators(
    userId: string,
    token: string | undefined
) {
    if (!token) throw new Error('No Token!');

    const response = await apiGet(`users/followed/${userId}`, '', token);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch Followed Creators: ${response.statusText}`
        );
    }
    return await response.json();
}

export async function findCreators(
    userId: string | undefined,
    creatorId: string | null,
    token: string | undefined
) {
    if (!token && userId) throw new Error('No Token!');
    if (!creatorId || creatorId === '') throw new Error('No Creator Id!');

    const res = await getCreators(userId, creatorId, token);
    if (!res.ok) throw new Error('Error fetching creator data.');

    return await res.json();
}

async function getCreators(
    userId: string | undefined,
    creatorId: string,
    token: string | undefined
) {
    if (userId) {
        if (!token) throw new Error('No Token!');

        return await apiGet(
            `users/creator/${creatorId}`,
            `user_id=${userId}`,
            token
        );
    } else {
        return await apiGet(`users/id/${creatorId}`);
    }
}
