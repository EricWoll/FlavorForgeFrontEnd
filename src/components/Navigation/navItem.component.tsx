import Link from 'next/link';

export default function NavItem({
    navLink,
    icon,
    itemName,
    showFullView,
}: {
    navLink: string;
    icon: React.ReactNode;
    itemName: string;
    showFullView: boolean;
}) {
    return (
        <li className="">
            <Link
                href={navLink}
                className="flex space-x-2 items-center select-none"
            >
                {icon}
                {showFullView && <p>{itemName}</p>}
            </Link>
        </li>
    );
}
