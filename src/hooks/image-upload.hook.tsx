'use client';

import { useUserContext } from '@/contexts/user.context';
import { apiPostForImage } from '@/utils/fetch/image.fetch';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

// Generic interface for any object that has an image ID property
interface ImageContainer {
    [key: string]: any; // Allow any other properties
}

// Configuration interface for the hook
interface ImageUploadConfig<T extends ImageContainer> {
    imageIdProperty: keyof T; // The property name that stores the image ID
    endpoint?: string; // API endpoint, defaults to 'images/upload'
    timeout?: number; // Request timeout, defaults to 60000ms
    maxFileSize?: number; // Max file size in bytes
    allowedTypes?: string[]; // Allowed file types
}

// Parameters for the mutation function
interface ImageUploadParams<T extends ImageContainer> {
    file: File;
    imageId: string;
    newUUID: string;
    updateFile?: boolean;
}

export const useImageUploadMutation = <T extends ImageContainer>(
    config: ImageUploadConfig<T> = {} as ImageUploadConfig<T>
) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
    const [abortController, setAbortController] =
        useState<AbortController | null>(null);

    const { getToken } = useUserContext();

    // Default configuration
    const {
        imageIdProperty,
        endpoint = 'images/upload',
        timeout = 60000,
        maxFileSize = 10 * 1024 * 1024, // 10MB
        allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
        ],
    } = config;

    // File validation function
    const validateFile = (file: File): string | null => {
        if (!file) return 'No file provided';

        if (file.size > maxFileSize) {
            return `File size too large. Maximum size is ${Math.round(
                maxFileSize / (1024 * 1024)
            )}MB`;
        }

        if (!allowedTypes.includes(file.type)) {
            return `Invalid file type. Allowed types: ${allowedTypes.join(
                ', '
            )}`;
        }

        return null;
    };

    const mutation = useMutation({
        mutationFn: async ({
            file,
            imageId,
            newUUID,
            updateFile = true,
        }: ImageUploadParams<T>) => {
            // Validate file
            const validationError = validateFile(file);
            if (validationError) {
                throw new Error(validationError);
            }

            const controller = new AbortController();
            setAbortController(controller);
            setIsUploading(true);
            setUploadProgress(0);

            try {
                const token = await getToken();

                const imageUrl = await apiPostForImage<string>({
                    url: endpoint,
                    file,
                    objectKey: imageId,
                    newObjectKey: newUUID,
                    updateFile,
                    authToken: token,
                    timeout,
                    onProgress: (progress) => {
                        setUploadProgress(progress.percentage);
                    },
                    abortController: controller,
                });

                setUploadedImgUrl(imageUrl);

                return imageUrl;
            } finally {
                setIsUploading(false);
                setAbortController(null);
                setUploadProgress(0);
            }
        },
        onError: (error) => {
            setIsUploading(false);
            setUploadProgress(0);
            setAbortController(null);

            // Handle specific error types
            if (error.message?.includes('File size too large')) {
                alert(
                    `Image file is too large. Please choose a smaller image (max ${Math.round(
                        maxFileSize / (1024 * 1024)
                    )}MB).`
                );
            } else if (error.message?.includes('Invalid file type')) {
                alert(
                    `Invalid image format. Please use: ${allowedTypes.join(
                        ', '
                    )}`
                );
            } else if (
                error.message?.includes('timed out') ||
                error.message?.includes('cancelled')
            ) {
                alert(
                    'Image upload was cancelled or timed out. Please try again.'
                );
            } else if (
                typeof error === 'object' &&
                error !== null &&
                'status' in error &&
                (error as any).status === 401
            ) {
                alert('Authentication failed. Please log in again.');
            } else if (
                typeof error === 'object' &&
                error !== null &&
                'status' in error &&
                (error as any).status === 413
            ) {
                alert(
                    'Image file is too large for the server. Please choose a smaller image.'
                );
            } else if (
                typeof error === 'object' &&
                error !== null &&
                'status' in error &&
                (error as any).status === 429
            ) {
                alert(
                    'Too many upload attempts. Please wait a moment and try again.'
                );
            } else {
                alert(
                    'Failed to upload image. Please check your connection and try again.'
                );
            }
        },
        onSuccess: (imageUrl) => {
            setUploadProgress(100);
            // Reset progress after a short delay
            setTimeout(() => setUploadProgress(0), 1000);
        },
    });

    const cancelUpload = () => {
        if (abortController) {
            abortController.abort();
        }
    };

    return {
        ...mutation,
        uploadProgress,
        isUploading,
        uploadedImgUrl,
        cancelUpload,
    };
};
