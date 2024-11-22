'use client';
import { NavBarContext } from '@/contexts/NavBar.context';
import { ReactNode, useContext } from 'react';
import NavItem from './navItem.component';
import { INavBarContext } from '@/types/iNavBarContext';
import { signOut, useSession } from 'next-auth/react';

export default function NavBar(): ReactNode {
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

function SmallNav({ NavBar }: { NavBar: INavBarContext }): ReactNode {
    const { data: session } = useSession();
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
                    {!session?.user ? (
                        <NavItem
                            navLink="/auth"
                            icon={<p className="text-xl">SI</p>}
                            itemName="Sign In"
                            onClick={handleNavItemClick}
                        />
                    ) : (
                        <>
                            <NavItem
                                navLink="/"
                                icon={<p className="text-xl">SO</p>}
                                itemName="Sign Out"
                                onClick={() => {
                                    handleNavItemClick();
                                    signOut();
                                }}
                            />
                            <NavItem
                                navLink="/profile"
                                icon={<p className="text-xl">P</p>}
                                itemName="Profile"
                                onClick={handleNavItemClick}
                            />
                            <NavItem
                                navLink="/my-recipes"
                                icon={<p className="text-xl">R</p>}
                                itemName="My Recipes"
                                onClick={handleNavItemClick}
                            />
                        </>
                    )}
                </nav>
            )}
        </>
    );
}

function MediumNav({ NavBar }: { NavBar: INavBarContext }): ReactNode {
    const { data: session } = useSession();
    return (
        <nav className="list-none bg-grayscale-900 px-1 rounded-xl max-h-fit sticky top-14">
            <NavItem
                navLink="/"
                icon={<p className="text-xl">H</p>}
                itemName="Home"
                showFullView={NavBar.isNavOpen}
            />
            {!session?.user ? (
                <NavItem
                    navLink="/auth"
                    icon={<p className="text-xl">SI</p>}
                    itemName="Sign In"
                    showFullView={NavBar.isNavOpen}
                />
            ) : (
                <>
                    <NavItem
                        navLink="/"
                        icon={<p className="text-xl">SO</p>}
                        itemName="Sign Out"
                        showFullView={NavBar.isNavOpen}
                        onClick={() => signOut()}
                    />
                    <NavItem
                        navLink="/profile"
                        icon={<p className="text-xl">P</p>}
                        itemName="Profile"
                        showFullView={NavBar.isNavOpen}
                    />
                    <NavItem
                        navLink="/my-recipes"
                        icon={<p className="text-xl">R</p>}
                        itemName="My Recipes"
                        showFullView={NavBar.isNavOpen}
                    />
                </>
            )}
        </nav>
    );
}
