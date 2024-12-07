import { apiGet, apiPostForImage } from '../handlerHelpers';

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
