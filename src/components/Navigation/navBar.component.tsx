'use client';
import { NavBarContext } from '@/contexts/NavBar.context';
import { useContext } from 'react';
import NavItem from './navItem.component';
import { INavBarContext } from '@/types/iNavBarContext';

export default function NavBar() {
    const NavBar = useContext(NavBarContext);

    return (
        <>
            {!NavBar.isWindowLarge ? (
                <SmallNav NavBar={NavBar} />
            ) : (
                <MediumNav NavBar={NavBar} />
            )}
        </>
    );
}

function SmallNav({ NavBar }: { NavBar: INavBarContext }) {
    const handleNavItemClick = () => {
        NavBar.setIsNavOpen(false);
    };
    return (
        <>
            {NavBar.isNavOpen && (
                <nav className="border-grayscale-500 border-2 list-none bg-grayscale-900 absolute z-10 w-4/6 h-5/6 mt-1 px-4 py-4 rounded-xl">
                    <NavItem
                        navLink="/"
                        icon={<p className="text-xl">H</p>}
                        itemName="Home"
                        onClick={handleNavItemClick}
                    />
                    <NavItem
                        navLink="/auth"
                        icon={<p className="text-xl">SI</p>}
                        itemName="Sign In"
                        onClick={handleNavItemClick}
                    />
                </nav>
            )}
        </>
    );
}

function MediumNav({ NavBar }: { NavBar: INavBarContext }) {
    return (
        <nav className="list-none bg-grayscale-900 rounded-xl px-2">
            <NavItem
                navLink="/"
                icon={<p className="text-xl">H</p>}
                itemName="Home"
                showFullView={NavBar.isNavOpen}
            />
            <NavItem
                navLink="/auth"
                icon={<p className="text-xl">SI</p>}
                itemName="Sign In"
                showFullView={NavBar.isNavOpen}
            />
        </nav>
    );
}
