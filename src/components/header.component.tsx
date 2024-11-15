import Link from 'next/link';
import NavButton from './Navigation/navButton.component';
import { ReactNode } from 'react';

export default function Header(): ReactNode {
    return (
        <header className="flex flex-nowrap rounded-full bg-grayscale-900 px-4 py-2 mb-2 mt-2">
            <NavButton buttonText="Nav" />
            <h1 className="mr-0 ml-auto">
                <Link href="/">FlavorForge</Link>
            </h1>
        </header>
    );
}
