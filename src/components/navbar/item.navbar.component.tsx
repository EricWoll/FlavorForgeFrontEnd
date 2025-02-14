import { INavBarContext, useNavBarContext } from '@/contexts/navbar.context';
import useWindow, {
    WindowSizes,
    WindowSizesType,
} from '@/hooks/useWindow.hook';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({
    children,
    href,
    hiddenOnLargeScreenClose = false,
}: {
    children: React.ReactNode;
    href: string;
    hiddenOnLargeScreenClose?: boolean;
}) {
    const NavBarContext = useNavBarContext();
    const Window = useWindow();
    const urlPath = usePathname();

    const handleOnClickSmall = () => {
        if (Window.windowSize.match(WindowSizes.SMALL)) {
            NavBarContext.setIsNavOpen(false);
        }
    };

    return (
        <Link
            href={href}
            onClick={handleOnClickSmall}
            className={`flex items-center justify-center select-none cursor-pointer border-l-4 border-r-4 border-transparent hover:shadow-popout_tinted_gray active:shadow-popin_tinted_gray py-1 px-2 rounded-lg ${
                urlPath === href &&
                'shadow-popin_tinted_gray hover:outline hover:outline-2 hover:outline-tinted_gray_600 active:outline-none'
            } ${
                !NavBarContext.isNavOpen &&
                Window.windowSize.match(WindowSizes.SMALL) &&
                'hidden'
            } ${
                NavBarContext.isNavOpen &&
                Window.windowSize.match(WindowSizes.SMALL) &&
                'gap-2 mx-10'
            } ${
                NavBarContext.isNavOpen &&
                !Window.windowSize.match(WindowSizes.SMALL) &&
                'gap-2'
            } ${
                !NavBarContext.isNavOpen &&
                !Window.windowSize.match(WindowSizes.SMALL) &&
                `flex-col text-xs gap-1 ${hiddenOnLargeScreenClose && 'hidden'}`
            } `}
        >
            {children}
        </Link>
    );
}
