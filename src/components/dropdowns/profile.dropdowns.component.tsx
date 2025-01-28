'use client';

import Link from 'next/link';

export default function ProfileDropDown({ className }: { className?: string }) {
    return (
        <div
            className={`absolute flex flex-col gap-2 z-10 bg-tinted_gray_700 shadow-lg outline outline-2 outline-tinted_gray_600 ${className}`}
        >
            <Link
                href="/user/profile"
                className="text-tinted_gray_100 hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-2 py-1 rounded-md text-center"
            >
                Profile
            </Link>
            <Link
                href="/user/settings"
                className="text-tinted_gray_100 hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray px-2 py-1 rounded-md text-center"
            >
                Settings
            </Link>
        </div>
    );
}
