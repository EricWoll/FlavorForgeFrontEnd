import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize?: 'sm' | 'md' | 'lg'; // controls font size
    paddingSize?: 'sm' | 'md' | 'lg'; // controls padding only
    variant?: 'outline' | 'ghost';
    rounded?: ButtonRounded;
    onEnter?: () => void;
}

const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
};

const paddingSizes = {
    sm: 'px-2 py-1',
    md: 'px-3 py-2',
    lg: 'px-4 py-3',
};

const roundedStyles: Record<ButtonRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            inputSize = 'md',
            paddingSize = 'sm',
            rounded = 'md',
            variant = 'outline',
            onEnter = () => {},
            ...props
        },
        ref
    ) => {
        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event?.key === 'Enter') {
                onEnter();
            } else if (event.key === 'Escape') {
                (document.activeElement as HTMLElement).blur();
            }
        };

        return (
            <input
                ref={ref}
                className={cn(
                    'w-full border bg-background text-foreground placeholder-muted-foreground transition-colors focus:outline-none',
                    fontSizeClasses[inputSize],
                    paddingSizes[paddingSize],
                    roundedStyles[rounded],
                    variant === 'outline' &&
                        'border-input focus:ring-2 focus:ring-ring',
                    variant === 'ghost' &&
                        'border-transparent bg-transparent focus:border-ring focus:ring-0',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                onKeyDown={handleKeyDown}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
export { Input };
