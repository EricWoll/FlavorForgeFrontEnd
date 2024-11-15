import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

export default function NavItem({
    navLink,
    icon,
    itemName,
    onClick = () => {},
    showFullView = true,
}: {
    navLink: string;
    icon: React.ReactNode;
    itemName: string;
    showFullView?: boolean;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}): ReactNode {
    return (
        <li className="px-4 my-2 rounded-lg hover:bg-grayscale-1_000">
            <Link
                href={navLink}
                className="flex space-x-2 items-center select-none"
                onClick={onClick}
            >
                {icon}
                {showFullView && <p>{itemName}</p>}
            </Link>
        </li>
    );
}
