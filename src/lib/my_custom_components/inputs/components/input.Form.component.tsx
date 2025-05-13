import clsx from 'clsx';
import { EyeClosedIcon, EyeIcon, LockIcon } from 'lucide-react';
import { useState } from 'react';

interface FormInputProps {
    label?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    disabled?: boolean;
    bg?: string;
    borderColor?: string;
    name?: string;
    id?: string;
    isTextArea?: boolean;
    resize?: 'none' | 'x' | 'y' | 'both';
    size?: 'sm' | 'md' | 'lg' | 'full';
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
 * @param disabled - Disables the field and applies disabled styles
 * @param bg - Tailwind-compatible background color (e.g., "white", "gray-100")
 * @param borderColor - Optional border color (e.g., 'border-gray-300'). If provided, a border will be applied.
 * @param name - HTML name attribute
 * @param id - HTML id (auto-generated if not provided)
 * @param isTextArea - Renders a textarea if true
 * @param resize - Controls textarea resizability
 * @param size - Width size: 'sm', 'md', 'lg', or 'full'
 * @param leadingIcon - Optional icon before input
 * @param trailingIcon - Optional icon after input
 * @param onLeadingIconClick - Click handler for leading icon (if present)
 * @param onTrailingIconClick - Click handler for trailing icon (if present)
 *
 * @returns JSX.Element - A styled input or textarea component
 */
export default function Input(props: FormInputProps): React.JSX.Element {
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
        'rounded-md py-[10px] text-dark-6 border border-transparent placeholder:text-tinted_gray_500 transition',
        'focus:border-tinted_gray_600 active:border-tinted_gray_300',
        props.disabled && 'bg-gray-200 text-gray-500 cursor-not-allowed',
        !props.disabled && 'hover:border-muted-foreground',
        props.leadingIcon ? 'pl-12' : 'pl-3',
        props.trailingIcon ? 'pr-12' : 'pr-3',
        widthClass,
        props.bg ? `bg-${props.bg}` : 'bg-transparent',
        props.borderColor &&
            `border-${props.borderColor} focus:border-${props.borderColor}`
    );

    return (
        <div className="mb-4 mt-2">
            <label
                htmlFor={inputId}
                className={clsx(
                    'mb-1 block text-base font-medium',
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
                        className={baseClass}
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
}
