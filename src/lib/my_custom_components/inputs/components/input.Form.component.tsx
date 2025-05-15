import clsx from 'clsx';
import { EyeClosedIcon, EyeIcon, LockIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface FormInputProps {
    label?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onEnter?: () => void;
    disabled?: boolean;
    bg?: string;
    borderColor?: string;
    paddingY?: 'sm' | 'md' | 'lg' | 'none';
    paddingX?: 'sm' | 'md' | 'lg' | 'none';
    marginY?: 'sm' | 'md' | 'lg' | 'none';
    marginX?: 'sm' | 'md' | 'lg' | 'none';
    name?: string;
    id?: string;
    isTextArea?: boolean;
    resize?: 'none' | 'x' | 'y' | 'both';
    size?: 'sm' | 'md' | 'lg' | 'full';
    maxWidth?:
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | 'full'
        | Omit<string, 'sm' | 'md' | 'lg' | 'xl' | 'full'>;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onLeadingIconClick?: React.MouseEventHandler<HTMLSpanElement>;
    onTrailingIconClick?: React.MouseEventHandler<HTMLSpanElement>;
}

/**
 * A customizable input component supporting text input or textarea,
 * with optional clickable icons and styling flexibility.
 *
 * @param label - Label text for the input field (optional)
 * @param type - HTML input type (ignored if isTextArea is true)
 * @param placeholder - Placeholder text
 * @param value - Input or textarea value
 * @param onChange - Change event handler
 * @param onEnter - Optional handler for the Enter key (e.g., for submission). NOT for a TextArea.
 * @param disabled - Disables the field and applies disabled styles
 * @param bg - Tailwind-compatible background color (e.g., "white", "gray-100")
 * @param borderColor - Optional border color (e.g., 'border-gray-300'). If provided, a border will be applied.
 * @param paddingY - Padding size on the y-axis (default: py-2)
 * @param paddingX - Padding size on the x-axis (default: px-2)
 * @param marginY - Margin size on the y-axis (default: py-0)
 * @param marginX - Margin size on the x-axis (default: px-0)
 * @param name - HTML name attribute
 * @param id - HTML id (auto-generated if not provided)
 * @param isTextArea - Renders a textarea if true
 * @param resize - Controls textarea resizability
 * @param size - Width size: 'sm', 'md', 'lg', or 'full'
 * @param maxWidth - Max Width size: 'sm', 'md', 'lg', 'xl', custom (eg. [500px]).
 * @param leadingIcon - Optional icon before input
 * @param trailingIcon - Optional icon after input
 * @param onLeadingIconClick - Click handler for leading icon (if present)
 * @param onTrailingIconClick - Click handler for trailing icon (if present)
 *
 * @returns JSX.Element - A styled input or textarea component
 */
const Input = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    FormInputProps
>((props, ref) => {
    const inputId =
        props.id ||
        props.name ||
        props.label?.toLowerCase().replace(/\s+/g, '-');

    const widthClass = {
        sm: 'w-40',
        md: 'w-64',
        lg: 'w-96',
        full: 'w-full',
    }[props.size || 'md'];

    const baseClass = clsx(
        'rounded-md text-dark-6 placeholder:text-tinted_gray_500 placeholder:select-none transition',
        props.disabled && 'bg-gray-200 text-gray-500 cursor-not-allowed',
        !props.disabled && 'hover:border-muted-foreground',
        props.leadingIcon ? 'pl-12' : 'pl-3',
        props.trailingIcon ? 'pr-12' : 'pr-3',
        widthClass,
        props.maxWidth === 'sm' // Max Width
            ? 'max-w-xs'
            : props.maxWidth === 'md'
            ? 'max-w-md'
            : props.maxWidth === 'lg'
            ? 'max-w-lg'
            : props.maxWidth === 'xl'
            ? 'max-w-xl'
            : props.maxWidth === 'full'
            ? 'max-w-full'
            : props.maxWidth,
        props.paddingY === 'sm' // padding Y
            ? 'py-1'
            : props.paddingY === 'md'
            ? 'py-2'
            : props.paddingY === 'lg'
            ? 'py-3'
            : props.paddingY === 'none'
            ? 'py-0'
            : 'py-2',
        props.paddingX === 'sm' // Padding X
            ? 'px-1'
            : props.paddingX === 'md'
            ? 'px-2'
            : props.paddingX === 'lg'
            ? 'px-3'
            : props.paddingX === 'none'
            ? 'px-0'
            : 'px-2',
        props.marginY === 'sm' // Margin Y
            ? 'my-1'
            : props.marginY === 'md'
            ? 'my-2'
            : props.marginY === 'lg'
            ? 'my-3'
            : props.marginY === 'none'
            ? 'my-0'
            : 'my-0',
        props.marginX === 'sm' // Margin X
            ? 'mx-1'
            : props.marginX === 'md'
            ? 'mx-2'
            : props.marginX === 'lg'
            ? 'mx-3'
            : props.marginX === 'none'
            ? 'mx-0'
            : 'mx-0',
        props.bg ? `bg-${props.bg}` : 'bg-transparent',
        props.borderColor
            ? clsx('border', props.borderColor, `focus:${props.borderColor}`)
            : 'border border-transparent focus:border-tinted_gray_600 active:border-tinted_gray_300'
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onEnter?.();
        } else if (event.key === 'Escape') {
            (document.activeElement as HTMLElement).blur();
        }
    };

    return (
        <div className="">
            <label
                htmlFor={inputId}
                className={clsx(
                    'block text-base font-medium',
                    props.disabled ? 'text-gray-400' : 'text-dark'
                )}
            >
                {props.label}
            </label>

            <div className="relative">
                {props.isTextArea ? (
                    <textarea
                        id={inputId}
                        name={props.name}
                        disabled={props.disabled}
                        placeholder={props.placeholder || ''}
                        onChange={props.onChange}
                        value={props.value}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        className={clsx(
                            baseClass,
                            props.resize
                                ? `resize-${props.resize}`
                                : 'resize-none',
                            'min-h-[100px]'
                        )}
                    />
                ) : (
                    <input
                        id={inputId}
                        name={props.name}
                        type={props.type}
                        disabled={props.disabled}
                        placeholder={props.placeholder || ''}
                        onChange={props.onChange}
                        value={props.value}
                        ref={ref as React.Ref<HTMLInputElement>}
                        className={baseClass}
                        onKeyDown={handleKeyDown}
                    />
                )}

                {props.leadingIcon && (
                    <span
                        className={clsx(
                            'absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500',
                            props.onLeadingIconClick &&
                                'cursor-pointer hover:text-primary'
                        )}
                        onClick={props.onLeadingIconClick}
                    >
                        {props.leadingIcon}
                    </span>
                )}

                {props.trailingIcon && (
                    <span
                        className={clsx(
                            'absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500',
                            props.onTrailingIconClick &&
                                'cursor-pointer hover:text-primary'
                        )}
                        onClick={props.onTrailingIconClick}
                    >
                        {props.trailingIcon}
                    </span>
                )}
            </div>
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
