import { MouseEventHandler, ReactNode } from 'react';

export default function FormButton({
    buttonText,
    leftIcon,
    rightIcon,
    onClick,
    disabled = false,
    type = 'button',
    wFull = true,
}: {
    buttonText: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    wFull?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
}): ReactNode {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`select-none ${
                wFull ? 'w-full' : 'h-fit mt-auto mb-4 mr-2 px-2 py-2'
            } bg-transparent rounded-md border border-stroke py-1 text-dark-6 transition disabled:cursor-default disabled:bg-slate-800`}
        >
            {leftIcon && leftIcon}
            {buttonText}
            {rightIcon && rightIcon}
        </button>
    );
}
