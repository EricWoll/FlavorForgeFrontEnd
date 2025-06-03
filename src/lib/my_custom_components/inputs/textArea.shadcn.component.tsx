// components/ui/Textarea.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'ghost';
}

const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, size = 'md', variant = 'outline', ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    'w-full min-h-[80px] rounded-md border bg-background text-foreground placeholder-muted-foreground shadow-sm transition-colors',
                    sizeClasses[size],
                    variant === 'outline' &&
                        'border-input focus:ring-2 focus:ring-ring',
                    variant === 'ghost' &&
                        'border-transparent bg-transparent focus:border-ring focus:ring-0',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
export { Textarea };
