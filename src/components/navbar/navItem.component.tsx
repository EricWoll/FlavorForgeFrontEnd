import { INavBarContext, useNavBarContext } from '@/contexts/navbar.context';
import useWindow, {
    WindowSizes,
    WindowSizesType,
} from '@/hooks/useWindow.hook';
import Link from 'next/link';

export default function NavItem({ children }: { children: React.ReactNode }) {
    const NavBarContext = useNavBarContext();
    const Window = useWindow();
    return (
        <Link
            href="/user/profile"
            className={`flex items-center justify-center select-none cursor-pointer hover:bg-tinted_gray_500 py-1 px-2 rounded-md hover:text-white_1_000 ${
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
                'flex-col text-xs gap-1'
            } `}
        >
            {children}
        </Link>
    );
}
