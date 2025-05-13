'use client';

import Link, { LinkProps } from 'next/link';
import {
    ButtonHTMLAttributes,
    MouseEventHandler,
    ReactNode,
    useState,
} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean;
    isOutlined?: boolean;
}

interface LinkButtonProps extends LinkProps {
    isDisabled?: boolean;
    children: ReactNode;
    className?: string;
    isOutlined?: boolean;
}

function buttonHover({
    isDisabled = false,
    isOutlined = false,
    ...props
}: ButtonProps) {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (!isDisabled && props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <button
            {...props}
            className={`p-2 w-fit rounded-md ${props.className} ${
                !isDisabled &&
                !isOutlined &&
                'hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray'
            } ${isDisabled && 'cursor-default'} ${
                isOutlined &&
                'hover:outline outline-2 outline-tinted_gray_500 active:shadow-popin_tinted_gray shadow-popout_tinted_gray'
            }`}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
}

function buttonSwitch({
    isDisabled = false,
    isOutlined = false,
    ...props
}: ButtonProps) {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (props.onClick) {
            e.preventDefault();
            props.onClick(e);
            setIsActive((prev) => !prev);
        }
    };

    return (
        <button
            {...props}
            className={`w-fit rounded-md ${props.className} ${
                !isActive &&
                !isDisabled &&
                !isOutlined &&
                'hover:shadow-popout_tinted_gray'
            } ${
                isActive &&
                !isDisabled &&
                !isOutlined &&
                'shadow-popin_tinted_gray'
            } ${isDisabled && 'cursor-default'} ${
                isOutlined &&
                'hover:outline outline-2 outline-tinted_gray_500 active:shadow-popin_tinted_gray shadow-popout_tinted_gray'
            }`}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
}

function buttonLink({
    isDisabled = false,
    isOutlined = false,
    ...props
}: LinkButtonProps) {
    return (
        <Link
            {...props}
            className={`px-1 rounded-md select-none ${props.className} ${
                !isDisabled &&
                !isOutlined &&
                'hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray'
            } ${isDisabled && 'cursor-default'} ${
                isOutlined &&
                'hover:outline outline-2 outline-tinted_gray_500 active:shadow-popin_tinted_gray shadow-popout_tinted_gray'
            }`}
        >
            {props.children}
        </Link>
    );
}

export const Button = {
    Hover: buttonHover,
    Switch: buttonSwitch,
    Link: buttonLink,
};
