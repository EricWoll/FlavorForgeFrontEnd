'use client';
import { NavBarContext } from '@/contexts/NavBar.context';
import { ReactNode, useContext, useEffect } from 'react';

export function FormColumn({ children }: { children: ReactNode }): ReactNode {
    const NavBar = useContext(NavBarContext);

    return (
        <div className="w-full px-4">
            <div className="mb-12">{children}</div>
        </div>
    );
}
