'use client';

import Link from 'next/link';

export default function ProfileDropDown({ className }: { className?: string }) {
    return (
        <div
            className={`absolute flex flex-col gap-2 bg-white_1_000 outline outline-2 outline-tinted_gray_500 ${className}`}
        >
            <Link
                href="/user/profile"
                className="text-tinted_gray_500 hover:underline underline-offset-2"
            >
                Profile
            </Link>
            <Link
                href="/user/settings"
                className="text-tinted_gray_500 hover:underline underline-offset-2"
            >
                Settings
            </Link>
        </div>
    );
}
