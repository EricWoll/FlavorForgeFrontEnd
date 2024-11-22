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
        <li className="px-1 my-2 rounded-lg hover:bg-grayscale-1_000 w-full">
            <Link
                href={navLink}
                className="flex flex-col space-x-2 items-center select-none flex-wrap justify-center text-nowrap"
                onClick={onClick}
            >
                {icon}
                {showFullView && <p className="text-xs">{itemName}</p>}
            </Link>
        </li>
    );
}
