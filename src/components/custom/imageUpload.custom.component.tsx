'use client';

import { useImageUploadMutation } from '@/hooks/image-upload.hook';
import React, {
    useEffect,
    useState,
    useCallback,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { Upload, X, Camera, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

interface RecipeImageUploaderProps<T> {
    imageContainer?: T | null;
    setImageContainer?: React.Dispatch<React.SetStateAction<T | null>>;
    className?: string;
    showReplaceButton?: boolean;
    startUpload?: boolean;
}

const RecipeImageUploader = forwardRef(
    <T extends Recipe>(
        {
            imageContainer,
            setImageContainer,
            className,
            showReplaceButton = true,
            startUpload,
        }: RecipeImageUploaderProps<T>,
        ref: React.Ref<{ handleUpload: () => Promise<string | null> }>
    ) => {
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        const {
            mutateAsync: uploadImageAsync,
            uploadProgress,
            isUploading,
            uploadedImgUrl,
            cancelUpload,
        } = useImageUploadMutation<T>({
            imageIdProperty: 'imageId',
        });

        const hasExistingImage = Boolean(
            imageContainer?.imageId &&
                imageContainer.imageId !== 'none' &&
                imageContainer.imageId !== ''
        );

        const handleFileSelect = (file: File) => {
            setSelectedFile(file);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        };

        const handleUpload = useCallback(async (): Promise<string | null> => {
            if (!selectedFile) return null;
            if (!isUploading && startUpload) return null;

            const newUUID = crypto.randomUUID();
            const isReplacing = hasExistingImage;

            const uploadedUrl = await uploadImageAsync({
                file: selectedFile,
                imageId: isReplacing ? imageContainer?.imageId! : newUUID,
                newUUID,
                updateFile: isReplacing,
            });

            if (setImageContainer) {
                setImageContainer((prev) =>
                    prev ? { ...prev, recipeImageId: uploadedUrl } : prev
                );
            }

            return uploadedUrl;
        }, [
            selectedFile,
            hasExistingImage,
            imageContainer?.imageId,
            uploadImageAsync,
            setImageContainer,
            startUpload,
            isUploading,
        ]);

        useImperativeHandle(ref, () => ({
            handleUpload,
        }));

        const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
        };

        const handleReplaceImage = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept =
                'image/jpeg,image/jpg,image/png,image/gif,image/webp';
            input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleFileSelect(file);
            };
            input.click();
        };

        const handleCancel = () => {
            if (isUploading) {
                cancelUpload();
                setSelectedFile(null);
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                }
            }
        };

        const currentImageUrl = imageContainer?.imageId?.startsWith('http')
            ? imageContainer.imageId
            : null;

        const showPreview = previewUrl && selectedFile;

        return (
            <div className={clsx('recipe-image-uploader', className)}>
                <div className="space-y-4">
                    {/* Existing Image */}
                    {currentImageUrl && !showPreview && (
                        <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden border-2 border-gray-200">
                            <img
                                src={currentImageUrl}
                                alt="Current"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Upload Input */}
                    {(!currentImageUrl || showPreview) && (
                        <div className="relative border-2 border-dashed rounded-lg p-6 text-center border-gray-300 hover:border-gray-400">
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                onChange={handleFileInput}
                                disabled={isUploading}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            <div className="flex flex-col items-center space-y-3">
                                <Camera className="w-6 h-6 text-gray-600" />
                                <p className="text-sm text-gray-700">
                                    Click or drag image to upload
                                </p>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF, WEBP up to 10MB
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Upload Progress and Cancel */}
                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <button
                                onClick={handleCancel}
                                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel Upload</span>
                            </button>
                        </div>
                    )}

                    {/* Preview and Manual Upload Button */}
                    {showPreview && !isUploading && (
                        <div className="space-y-2">
                            <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden border-2 border-gray-200 mb-2">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Replace Button */}
                    {hasExistingImage &&
                        showReplaceButton &&
                        !isUploading &&
                        !showPreview && (
                            <button
                                onClick={handleReplaceImage}
                                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Replace Image</span>
                            </button>
                        )}
                </div>
            </div>
        );
    }
);

RecipeImageUploader.displayName = 'RecipeImageUploader';

export default RecipeImageUploader;
