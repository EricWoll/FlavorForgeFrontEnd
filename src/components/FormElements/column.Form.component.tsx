'use client';
import { ReactNode } from 'react';

export function FormColumn({ children }: { children: ReactNode }): ReactNode {
    return (
        <div className="w-full px-4">
            <div className="mb-12">{children}</div>
        </div>
    );
}
