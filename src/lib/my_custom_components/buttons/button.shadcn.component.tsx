import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonColor = 'primary' | 'secondary' | 'destructive' | 'default';
type ButtonVariant = 'filled' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    variant?: ButtonVariant;
    size?: ButtonSize;
    rounded?: ButtonRounded;
    loading?: boolean;
}

const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

const colorStyles: Record<ButtonColor, Record<ButtonVariant, string>> = {
    default: {
        filled: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border border-gray-600 text-gray-600 hover:bg-gray-100',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    },
    primary: {
        filled: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'bg-transparent text-primary hover:bg-primary/10',
    },
    secondary: {
        filled: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-secondary text-secondary hover:bg-secondary/20',
        ghost: 'bg-transparent text-secondary hover:bg-secondary/20',
    },
    destructive: {
        filled: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
            'border border-destructive text-destructive hover:bg-destructive/20',
        ghost: 'bg-transparent text-destructive hover:bg-destructive/20',
    },
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
};

const roundedStyles: Record<ButtonRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            color = 'default',
            variant = 'filled',
            size = 'md',
            rounded = 'md',
            loading,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                {...props}
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    baseClasses,
                    colorStyles[color][variant],
                    sizeStyles[size],
                    roundedStyles[rounded],
                    className
                )}
            >
                {loading && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
