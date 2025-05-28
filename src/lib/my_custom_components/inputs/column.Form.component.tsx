'use client';

/**
 * FormColumn - A layout component for wrapping form fields in a column layout.
 *
 * @param children - The child elements that are wrapped inside the column.
 *
 * @returns JSX.Element A column containing the provided children.
 */
export function FormColumn({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <div className="w-full px-4">
            <div className="mb-12">{children}</div>
        </div>
    );
}
