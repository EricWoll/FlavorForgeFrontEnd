export default function handleError(
    error: unknown,
    setError: React.Dispatch<React.SetStateAction<string>>,
    defaultErrorMessage: string = 'default error message'
) {
    if (
        typeof error === 'object' &&
        error !== null &&
        'errors' in error &&
        Array.isArray((error as any).errors)
    ) {
        setError((error as any).errors?.[0]?.message || defaultErrorMessage);
    } else if (error instanceof Error) {
        setError(error.message);
    } else {
        setError(defaultErrorMessage);
    }
}
