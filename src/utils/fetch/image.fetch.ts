import { apiGet } from './apiBase.fetch';

export async function findImage(filename: string) {
    try {
        return await apiGet(`images`, `filename=${filename}`);
    } catch (error) {
        throw new Error('Failed to fetch image!');
    }
}

export async function updateImage(
    file: File,
    objectKey: string,
    newObjectKey: string,
    updateFile: boolean,
    token: string | undefined
) {
    if (token) {
        await apiPostForImage(
            'images',
            file,
            objectKey,
            newObjectKey,
            updateFile,
            token
        );
    } else {
        throw new Error('No Token!');
    }
}

export async function apiPostForImage<T>(
    url: string,
    file: File,
    objectKey: string,
    newObjectKey: string,
    updateFile: boolean,
    authToken?: string
): Promise<T | null> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('objectKey', objectKey);
    formData.append('newObjectKey', newObjectKey);
    formData.append('updateFile', String(updateFile));

    const headers: { [key: string]: string } = {};

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
            {
                method: 'POST',
                body: formData,
                headers: headers,
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status} - ${errorText}`
            );
        }

        const text = await response.text();
        if (!text) {
            return null;
        }

        return JSON.parse(text);
    } catch (error) {
        console.error('API Post Request Failed:', error);
        throw error;
    }
}
