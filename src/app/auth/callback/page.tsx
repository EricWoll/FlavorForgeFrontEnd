import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function AuthCallback() {
    return (
        <AuthenticateWithRedirectCallback signInUrl="/auth" signUpUrl="/auth" />
    );
}
