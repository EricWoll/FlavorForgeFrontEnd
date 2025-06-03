import { cn } from '@/lib/utils';

type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
type Size = 'sm' | 'md' | 'lg';
type Variant = 'solid' | 'outline' | 'ghost';

const textSize: Record<Size, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

const paddingSize: Record<Size, string> = {
    sm: 'px-2 py-0.5',
    md: 'px-3 py-1',
    lg: 'px-4 py-2',
};

const roundedStyles: Record<ButtonRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
};

const variantStyles: Record<Variant, string> = {
    solid: 'bg-muted text-muted-foreground',
    outline: 'border border-input text-foreground',
    ghost: 'bg-transparent text-foreground',
};

interface TagProps {
    children: React.ReactNode;
    size?: Size;
    paddingSize?: Size;
    variant?: Variant;
    rounded?: ButtonRounded;
    className?: string;
}

export function Tag({
    children,
    size = 'md',
    paddingSize: pad = 'md',
    variant = 'solid',
    rounded = 'full',
    className,
}: TagProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center font-medium',
                textSize[size],
                paddingSize[pad],
                variantStyles[variant],
                roundedStyles[rounded],
                className
            )}
        >
            {children}
        </span>
    );
}
