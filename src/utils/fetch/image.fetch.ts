import { apiGet } from './apiBase.fetch';

interface ApiError {
    message: string;
    status: number;
    details?: any;
}

export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

interface ApiPostImageOptions {
    url: string;
    file: File;
    objectKey: string;
    newObjectKey: string;
    updateFile: boolean;
    authToken?: string | null;
    timeout?: number;
    onProgress?: (progress: UploadProgress) => void;
    abortController?: AbortController;
}

export async function apiPostForImage<T>(
    options: ApiPostImageOptions
): Promise<T | null> {
    const {
        url,
        file,
        objectKey,
        newObjectKey,
        updateFile,
        authToken,
        timeout = 30000, // 30 second default timeout
        onProgress,
        abortController,
    } = options;

    // Input validation
    if (!url?.trim()) {
        throw new Error('URL is required and cannot be empty');
    }

    if (!file) {
        throw new Error('File is required');
    }

    if (!newObjectKey?.trim()) {
        throw new Error('New object key is required and cannot be empty');
    }

    // Validate file type (adjust based on your requirements)
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
    ];
    if (!allowedTypes.includes(file.type)) {
        throw new Error(
            `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
        );
    }

    // Validate file size (adjust based on your requirements)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        throw new Error(
            `File size too large. Maximum size: ${maxSize / (1024 * 1024)}MB`
        );
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('objectKey', objectKey || '');
    formData.append('newObjectKey', newObjectKey);
    formData.append('updateFile', String(updateFile));

    const headers: Record<string, string> = {
        // Don't set Content-Type header - let browser set it with boundary for FormData
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const controller = abortController || new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url.replace(
            /^\//,
            ''
        )}`;

        // Create XMLHttpRequest for progress tracking if callback provided
        if (onProgress) {
            return await uploadWithProgress<T>(
                apiUrl,
                formData,
                headers,
                controller.signal,
                onProgress
            );
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            headers: headers,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            await handleApiError(response);
        }

        const contentType = response.headers.get('content-type');

        // Handle different response types
        if (contentType?.includes('application/json')) {
            const data = await response.json();
            return data || null;
        } else {
            const text = await response.text();
            if (!text.trim()) {
                return null;
            }
            // Try to parse as JSON, fallback to text
            try {
                return JSON.parse(text);
            } catch {
                return text as unknown as T;
            }
        }
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Upload was cancelled or timed out');
            }
            console.error('API Post Request Failed:', error.message);
        } else {
            console.error('API Post Request Failed:', error);
        }

        throw error;
    }
}

async function handleApiError(response: Response): Promise<never> {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    let errorDetails: any = null;

    try {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            errorDetails = await response.json();
            errorMessage =
                errorDetails.message || errorDetails.error || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
    } catch {
        // If we can't parse the error response, use the default message
        throw new Error(
            `HTTP error! status: ${response.status}. There was an issue!`
        );
    }

    const apiError: ApiError = {
        message: errorMessage,
        status: response.status,
        details: errorDetails,
    };

    throw apiError;
}

// Upload with progress tracking using XMLHttpRequest
function uploadWithProgress<T>(
    url: string,
    formData: FormData,
    headers: Record<string, string>,
    signal: AbortSignal,
    onProgress: (progress: UploadProgress) => void
): Promise<T | null> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Handle abort signal
        signal.addEventListener('abort', () => {
            xhr.abort();
            reject(new Error('Upload was cancelled'));
        });

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const progress: UploadProgress = {
                    loaded: event.loaded,
                    total: event.total,
                    percentage: Math.round((event.loaded / event.total) * 100),
                };
                onProgress(progress);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const contentType = xhr.getResponseHeader('content-type');
                    if (contentType?.includes('application/json')) {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data || null);
                    } else {
                        const text = xhr.responseText;
                        if (!text.trim()) {
                            resolve(null);
                        } else {
                            try {
                                resolve(JSON.parse(text));
                            } catch {
                                resolve(text as unknown as T);
                            }
                        }
                    }
                } catch (error) {
                    reject(new Error('Failed to parse response'));
                }
            } else {
                const apiError: ApiError = {
                    message: `HTTP ${xhr.status}: ${xhr.statusText}`,
                    status: xhr.status,
                    details: xhr.responseText,
                };
                reject(apiError);
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Network error occurred'));
        });

        xhr.addEventListener('timeout', () => {
            reject(new Error('Upload timed out'));
        });

        xhr.open('POST', url);

        // Set headers
        Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });

        xhr.send(formData);
    });
}

// For Backwards Compatability
export async function apiPostForImageLegacy<T>(
    url: string,
    file: File,
    objectKey: string,
    newObjectKey: string,
    updateFile: boolean,
    authToken?: string | null | undefined
): Promise<T | null> {
    return apiPostForImage<T>({
        url,
        file,
        objectKey,
        newObjectKey,
        updateFile,
        authToken,
    });
}
