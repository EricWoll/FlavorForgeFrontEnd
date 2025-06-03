'use client';

import MobileNav, {
    MobileNavTrigger,
} from '@/features/navbar/component/navbar.mobile.component';
import SmallSearchBar from '@/features/searchbar/component/small.searchbar.component';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { UserButton } from '@clerk/nextjs';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const Window = useWindow();

    const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
    const [isSmallSearchIconClicked, setIsSmallSearchIconClicked] =
        useState<boolean>(false);

    const isMobile = Window.windowSize.match(WindowSizes.SMALL);

    useEffect(() => {
        if (isMobile) return;

        setIsSmallSearchIconClicked(false);
    }, [isMobile]);

    if (!isMobile) {
        return null;
    }

    return (
        <div className="full bg-background shadow-md rounded-2xl border mx-4 flex items-center gap-2 flex-nowrap justify-between px-2">
            {!isSmallSearchIconClicked ? (
                <>
                    <section className="flex flex-nowrap items-center">
                        <MobileNavTrigger
                            open={navIsOpen}
                            onOpenChange={setNavIsOpen}
                        />
                        <MobileNav
                            open={navIsOpen}
                            onOpenChange={setNavIsOpen}
                        />
                        <Link
                            href="/"
                            className="select-none cursor-pointer text-background bg-accent px-2 py-1 rounded-md"
                        >
                            Flavor Forge
                        </Link>
                    </section>
                    <section className="flex flex-nowrap gap-2 items-center">
                        <SearchIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setIsSmallSearchIconClicked(true)}
                        />
                        <UserButton />
                    </section>
                </>
            ) : (
                <div className="w-full py-2">
                    <SmallSearchBar
                        setIsSmallSearchIconClicked={
                            setIsSmallSearchIconClicked
                        }
                    />
                </div>
            )}
        </div>
    );
}
