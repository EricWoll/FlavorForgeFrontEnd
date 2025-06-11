import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Dropzone: React.FC<DropzoneProps> = ({ className, size = 'lg' }) => {
    // Callback function to handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <Card
            {...getRootProps()}
            className={cn(
                'relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64',
                isDragActive
                    ? 'border-primary bg-primary/10 border-solid ring-0'
                    : 'border-border hover:border-primary'
            )}
        >
            <CardContent className="flex items-center justify-center h-full w-full">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-center">Drop the files here ...</p>
                ) : (
                    <div className="flex flex-col items-center gap-y-3">
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                        <Button variant="default">Select Files</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

Dropzone.displayName = 'Dropzone';

export default Dropzone;
