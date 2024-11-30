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
                className={`flex space-x-2 items-center select-none flex-wrap  text-nowrap ${
                    showFullView ? 'justify-start' : 'justify-center flext-col'
                }`}
                onClick={onClick}
            >
                {icon}
                {showFullView && <p className="text-lg">{itemName}</p>}
            </Link>
        </li>
    );
}
