'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect, useState } from 'react';
import { UrlObject } from 'url';

export default function NavItem({
    icon,
    displayText,
    href,
    hiddenOnLargeScreenClose = false,
    onClick,
    isCenter = false,
    className,
    isShown = true,
    isIconOnly = false,
    textColor,
    textSize,
    textNoWrap = false,
}: {
    icon: React.ReactNode;
    displayText: string;
    href: string | UrlObject;
    hiddenOnLargeScreenClose?: boolean;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    className?: string;
    isCenter?: boolean;
    isShown?: boolean;
    isIconOnly?: boolean;
    textColor?: string;
    textSize?: string;
    textNoWrap?: boolean;
}) {
    const urlPath = usePathname();

    const [pathnameOnly, setPathnameOnly] = useState<string>('');

    useEffect(() => {
        setPathnameOnly(href.toString().split('?')[0]);
    }, [urlPath]);

    return (
        <>
            {isShown && (
                <Link
                    href={href}
                    onClick={onClick}
                    className={`flex items-center gap-2 ${
                        isCenter && 'justify-center'
                    } hover:outline hover:outline-2 hover:outline-tinted_gray_600 select-none cursor-pointer border-transparent hover:shadow-gray-sm active:shadow-inset-gray-sm py-1 px-2 rounded-5 ${
                        urlPath === pathnameOnly && 'shadow-inset-gray-sm'
                    } ${clsx(
                        textColor,
                        textNoWrap && 'text-nowrap',
                        textSize == 'xs'
                            ? 'text-xs'
                            : textSize == 'sm'
                            ? 'text-sm'
                            : textSize == 'md'
                            ? 'text-md'
                            : textSize == 'lg'
                            ? 'text-lg'
                            : 'text-sm'
                    )}`}
                >
                    {icon}
                    {!isIconOnly && <p>{displayText}</p>}
                </Link>
            )}
        </>
    );
}
