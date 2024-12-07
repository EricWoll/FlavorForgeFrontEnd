import { apiGet, apiPut } from '../handlerHelpers';

export async function findUserById(userId: string) {
    const response = await apiGet(`users/id/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch User: ${response.statusText}`);
    }
    return await response.json();
}

export async function findUserByUsername(
    username: string,
    token: string | undefined
) {
    if (!token) throw new Error('No Token!');

    const response = await apiGet(`users/${username}`, '', token);
    if (!response.ok) {
        throw new Error(`Failed to fetch User: ${response.statusText}`);
    }
    return await response.json();
}

export async function findEditableUserByUsername(
    username: string,
    token: string | undefined
) {
    if (!token) throw new Error('No Token!');

    const response = await apiGet(`users/edit/${username}`, '', token);
    if (!response.ok) {
        throw new Error(`Failed to fetch User: ${response.statusText}`);
    }
    return await response.json();
}

export async function updateUser(
    userProfile: EditUser,
    token: string | undefined
) {
    if (token) {
        await apiPut(
            `users/${userProfile.username}`,
            { ...userProfile },
            token
        );
    } else {
        throw new Error('No Token!');
    }
}
