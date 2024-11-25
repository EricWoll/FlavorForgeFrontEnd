'use client';
import { Key, MouseEventHandler, ReactNode } from 'react';

export default function ListItemEditor({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLSpanElement>;
}) {
    return (
        <li className="flex flex-nowrap">
            {children}
            <span
                onClick={onClick}
                className="ml-auto mr-0 text-red-700 cursor-pointer"
            >
                X
            </span>
        </li>
    );
}
