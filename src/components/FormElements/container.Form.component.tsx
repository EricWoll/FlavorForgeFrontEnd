import { FormEventHandler, ReactNode } from 'react';

export default function FormContainer({
    children,
    method,
    onSubmit,
}: {
    children: ReactNode;
    method: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
}): ReactNode {
    return (
        <form className="py-1 dark:bg-dark" method={method} onSubmit={onSubmit}>
            <div className="container">
                <div className="flex flex-wrap">{children}</div>
            </div>
        </form>
    );
}
