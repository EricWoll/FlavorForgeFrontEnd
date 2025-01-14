'use client';

import MenuIcon from '@/svg/icon-menu.svg';
import UserIcon from '@/svg/icon-user.svg';
import Link from 'next/link';
import ProfileDropDown from './dropdown/profile.component';
import { useState } from 'react';

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

    const handleProfileClick = () => {
        setIsProfileOpen((prev) => !prev);
    };

    return (
        <header className="flex justify-between items-center py-2">
            <section className="flex gap-2 items-center">
                <MenuIcon
                    viewBox="0 0 40 40"
                    className="w-8 h-8 select-none cursor-pointer"
                />
                <Link
                    href="/"
                    className="font-extrabold text-md font-outline-1 text-white_1_000 bg-gradient_red rounded-md h-fit px-1 font-outline-1 select-none"
                >
                    FlavorForge
                </Link>
            </section>
            <section className="flex items-center justify-center relative">
                <UserIcon
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 outline outline-2 outline-tinted_gray_100 rounded-sm select-none cursor-pointer ${
                        isProfileOpen && 'bg-white_1_000'
                    }`}
                    onClick={handleProfileClick}
                />
                {isProfileOpen && (
                    <ProfileDropDown className="top-10 right-0 p-3 rounded-md" />
                )}
            </section>
        </header>
    );
}
