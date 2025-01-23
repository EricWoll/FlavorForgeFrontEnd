'use client';

import Link from 'next/link';

export default function ProfileDropDown({ className }: { className?: string }) {
    return (
        <div
            className={`absolute flex flex-col gap-2 outline outline-2 outline-tinted_gray_100 z-10 bg-tinted_gray_700 ${className}`}
        >
            <Link
                href="/user/profile"
                className="text-tinted_gray_100 hover:bg-tinted_gray_500 hover:text-white_1_000 px-2 py-1 rounded-md text-center"
            >
                Profile
            </Link>
            <Link
                href="/user/settings"
                className="text-tinted_gray_100 hover:bg-tinted_gray_500 hover:text-white_1_000 px-2 py-1 rounded-md text-center"
            >
                Settings
            </Link>
        </div>
    );
}
