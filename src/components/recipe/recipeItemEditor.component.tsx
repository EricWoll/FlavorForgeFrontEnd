import { Key, MouseEventHandler, ReactNode } from 'react';

export default function ListItemEditor({
    children,
    key,
    onClick,
}: {
    children: ReactNode;
    key: Key;
    onClick: MouseEventHandler<HTMLSpanElement>;
}) {
    return (
        <li className="flex flex-nowrap" key={key}>
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
