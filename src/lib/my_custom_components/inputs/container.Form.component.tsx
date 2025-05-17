import clsx from 'clsx';

interface FormContainerProps {
    children: React.ReactNode;
    method?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    boxShadow?: string;
    minWidth?: string | undefined;
}

/**
 * FormContainer - A container component for wrapping form elements with customizable styles.
 *
 * @param children - The child elements or form fields that are wrapped inside the form.
 * @param method - The HTTP method to be used when submitting the form (e.g., 'POST', 'GET'). Default is undefined.
 * @param onSubmit - Optional callback function triggered when the form is submitted. Default is undefined.
 * @param bgColor - Optional background color (e.g., 'bg-white', 'bg-gray-100'). Default is 'bg-transparent'.
 * @param borderColor - Optional border color (e.g., 'border-gray-300'). If provided, a border will be applied.
 * @param textColor - Optional text color (e.g., 'text-black', 'text-gray-700'). Default is 'text-dark'.
 * @param boxShadow - Optional box shadow class (e.g., 'shadow-lg', 'shadow-inset'). Default is no box shadow.
 *
 * @returns JSX.Element - The rendered form element with the applied styles.
 */
export default function FormContainer({
    children,
    method,
    onSubmit,
    bgColor = 'bg-transparent',
    borderColor,
    textColor = 'text-dark',
    boxShadow = '',
    minWidth = 'min-w-96',
}: FormContainerProps): React.JSX.Element {
    const formClassNames = clsx(
        'py-1 dark:bg-dark rounded-10', // Base classes
        minWidth,
        borderColor && `border ${borderColor}`, // Conditionally apply border if borderColor is provided
        bgColor, // Conditionally apply bgColor
        textColor, // Conditionally apply textColor
        boxShadow, // Conditionally apply boxShadow if provided
        borderColor && 'outline outline-2' // Conditionally add outline if borderColor is provided
    );

    return (
        <form className={formClassNames} method={method} onSubmit={onSubmit}>
            <div className="container">
                <div className="flex flex-wrap">{children}</div>
            </div>
        </form>
    );
}
