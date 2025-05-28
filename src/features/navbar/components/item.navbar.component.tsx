'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { UrlObject } from 'url';

export default function NavItem({
    icon,
    displayText,
    href,
    onClick,
    className,
    isCenter = false,
    isShown = true,
    isIconOnly = false,
    textColor,
    textSize = 'sm',
    textNoWrap = false,
}: {
    icon: React.ReactNode;
    displayText: string;
    href: string | UrlObject;
    onClick?: () => void;
    className?: string;
    isCenter?: boolean;
    isShown?: boolean;
    isIconOnly?: boolean;
    textColor?: string;
    textSize?: 'xs' | 'sm' | 'md' | 'lg';
    textNoWrap?: boolean;
}) {
    const path = usePathname();
    const targetPath = href.toString().split('?')[0];
    const isActive = path.split('?')[0] === targetPath;

    if (!isShown) return null;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 my-2',
                isCenter && 'justify-center',
                // isActive && 'bg-tinted_gray_700 shadow-inset-gray-sm',
                'border-4 border-transparent hover:border-tinted_gray_600/50',
                textColor,
                textNoWrap && 'whitespace-nowrap',
                {
                    'text-xs': textSize === 'xs',
                    'text-sm': textSize === 'sm',
                    'text-md': textSize === 'md',
                    'text-lg': textSize === 'lg',
                },
                className
            )}
        >
            {icon}
            {!isIconOnly && (
                <span className="select-none cursor-pointer">
                    {displayText}
                </span>
            )}
        </Link>
    );
}
