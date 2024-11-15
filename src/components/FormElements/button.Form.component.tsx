import { MouseEventHandler, ReactNode } from 'react';

export default function FormButton({
    buttonText,
    leftIcon,
    rightIcon,
    onClick,
    disabled = false,
    type = 'button',
}: {
    buttonText: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
}): ReactNode {
    return (
        <button
            disabled={disabled}
            onClick={onClick && onClick}
            type={type}
            className={`w-full bg-transparent rounded-md border border-stroke py-1 text-dark-6 transition disabled:cursor-default disabled:bg-slate-800`}
        >
            {leftIcon && leftIcon}
            {buttonText}
            {rightIcon && rightIcon}
        </button>
    );
}
