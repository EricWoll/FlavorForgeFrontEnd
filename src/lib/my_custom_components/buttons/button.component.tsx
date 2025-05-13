'use client';

import Link, { LinkProps } from 'next/link';
import {
    ButtonHTMLAttributes,
    MouseEventHandler,
    ReactNode,
    useState,
} from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean;
    isOutlined?: boolean;
    isCropped?: boolean;
    isFullWidth?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: 'small' | 'medium' | 'large';
    type?: 'submit' | 'reset' | 'button' | undefined;
}

interface LinkButtonProps extends LinkProps {
    isDisabled?: boolean;
    children: ReactNode;
    className?: string;
    isOutlined?: boolean;
    isCropped?: boolean;
    isFullWidth?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: 'small' | 'medium' | 'large';
    type?: 'submit' | 'reset' | 'button' | undefined;
}

/**
 * Button.Hover — a hover-responsive button with optional outline/cropping and icons.
 *
 * @param isDisabled - Disable the button and remove interactions
 * @param isOutlined - Add outline and special hover behavior
 * @param isCropped - Limit width to content
 * @param iconLeft - Icon on the left side of the button (optional)
 * @param iconRight - Icon on the right side of the button (optional)
 * @param size - Size of the button ('small', 'medium', 'large')
 * @param type - Type of the button ('submit', 'reset', 'button', or undefined)
 * @returns A hover-capable <button> element
 */
function buttonHover({
    isDisabled = false,
    isOutlined = false,
    isCropped = false,
    isFullWidth = false,
    iconLeft,
    iconRight,
    size = 'medium',
    type = 'button',
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
            type={type}
            className={clsx(
                'p-2 rounded-md',
                isOutlined && 'outline outline-2 outline-tinted_gray_500',
                !isDisabled &&
                    'hover:shadow-gray-sm active:shadow-inset-gray-sm',
                isDisabled && 'cursor-default opacity-50',
                size === 'small' && 'px-2 py-1 text-sm',
                size === 'medium' && 'px-4 py-2',
                size === 'large' && 'px-6 py-3 text-lg',
                isFullWidth ? 'w-full' : isCropped ? 'w-fit' : '',
                props.className
            )}
            onClick={handleClick}
        >
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {props.children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
        </button>
    );
}

/**
 * Button.Switch — toggles visual state on click (like active/inactive).
 *
 * @param isDisabled - Disable the button
 * @param isOutlined - Add outline styling
 * @param isCropped - Limit width to content
 * @param iconLeft - Icon on the left side of the button (optional)
 * @param iconRight - Icon on the right side of the button (optional)
 * @param size - Size of the button ('small', 'medium', 'large')
 * @param type - Type of the button ('submit', 'reset', 'button', or undefined)
 * @returns A toggle-style <button> element
 */
function buttonSwitch({
    isDisabled = false,
    isOutlined = false,
    isCropped = false,
    isFullWidth = false,
    iconLeft,
    iconRight,
    size = 'medium',
    type = 'button',
    ...props
}: ButtonProps) {
    const [isActive, setIsActive] = useState(false);

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
            type={type}
            className={clsx(
                'rounded-md w-fit',
                isOutlined && 'outline outline-2 outline-tinted_gray_500',
                !isActive &&
                    !isDisabled &&
                    !isOutlined &&
                    'hover:shadow-gray-sm',
                isActive &&
                    !isDisabled &&
                    !isOutlined &&
                    'shadow-inset-gray-sm',
                isDisabled && 'cursor-default opacity-50',
                size === 'small' && 'px-2 py-1 text-sm',
                size === 'medium' && 'px-4 py-2',
                size === 'large' && 'px-6 py-3 text-lg',
                isFullWidth ? 'w-full' : isCropped ? 'w-fit' : '',
                props.className
            )}
            onClick={handleClick}
        >
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {props.children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
        </button>
    );
}

/**
 * Button.Link — styled `next/link` component with button-like behavior.
 *
 * @param isDisabled - Visually disables the link
 * @param isOutlined - Adds outline and shadows
 * @param isCropped - Limits width to content
 * @param iconLeft - Icon on the left side of the button (optional)
 * @param iconRight - Icon on the right side of the button (optional)
 * @param size - Size of the button ('small', 'medium', 'large')
 * @param type - Type of the button ('submit', 'reset', 'button', or undefined)
 * @returns A Next.js <Link> styled as a button
 */
function buttonLink({
    isDisabled = false,
    isOutlined = false,
    isCropped = false,
    isFullWidth = false,
    iconLeft,
    iconRight,
    size = 'medium',
    type = 'button',
    ...props
}: LinkButtonProps) {
    return (
        <Link
            {...props}
            type={type}
            className={clsx(
                'px-1 rounded-md select-none',
                !isDisabled &&
                    !isOutlined &&
                    'hover:shadow-gray-sm active:shadow-inset-gray-sm',
                isDisabled && 'cursor-default opacity-50',
                isOutlined &&
                    'hover:outline outline-2 outline-tinted_gray_500 hover:shadow-gray-sm active:shadow-inset-gray-sm',
                size === 'small' && 'px-2 py-1 text-sm',
                size === 'medium' && 'px-4 py-2',
                size === 'large' && 'px-6 py-3 text-lg',
                isFullWidth ? 'w-full' : isCropped ? 'w-fit' : '',
                props.className
            )}
        >
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {props.children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
        </Link>
    );
}

/**
 * A collection of styled button components:
 * - Button.Hover: Simple hover button
 * - Button.Switch: Toggleable active state
 * - Button.Link: Next.js link styled like a button
 */
export const Button = {
    Hover: buttonHover,
    Switch: buttonSwitch,
    Link: buttonLink,
};
