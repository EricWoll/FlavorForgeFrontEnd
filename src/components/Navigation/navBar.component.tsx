'use client';
import { NavBarContext } from '@/contexts/NavBar.context';
import { useContext } from 'react';
import NavItem from './navItem.component';

export default function NavBar() {
    const NavBar = useContext(NavBarContext);

    return (
        <nav className="list-none bg-cyan-500 rounded-lg px-4 mx-4">
            {NavBar.isWindowLarge ? (
                <>
                    <NavItem
                        navLink="/"
                        icon={<p className="text-xl">D</p>}
                        itemName="Default"
                        showFullView={NavBar.isNavOpen}
                    />
                    <NavItem
                        navLink="/"
                        icon={<p className="text-xl">D</p>}
                        itemName="Default"
                        showFullView={NavBar.isNavOpen}
                    />
                </>
            ) : (
                NavBar.isNavOpen && (
                    <>
                        <NavItem
                            navLink="/"
                            icon={<p className="text-xl">D</p>}
                            itemName="Default"
                            showFullView={true}
                        />
                        <NavItem
                            navLink="/"
                            icon={<p className="text-xl">D</p>}
                            itemName="Default"
                            showFullView={true}
                        />
                    </>
                )
            )}
        </nav>
    );
}
