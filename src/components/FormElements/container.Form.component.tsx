import { ReactNode } from 'react';

export default function FormContainer({ children }: { children: ReactNode }) {
    return (
        <section className="py-1 dark:bg-dark">
            <div className="container">
                <div className="flex flex-wrap">{children}</div>
            </div>
        </section>
    );
}
