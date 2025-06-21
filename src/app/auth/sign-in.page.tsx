'use client';

import PasswordInput from '@/components/custom/password.custom.component';
import GoogleIcon from '@/components/svg/googleIcon.svg.component';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import handleError from '@/utils/errors/error.set';
import { useSignIn } from '@clerk/nextjs';
import { Chrome, Loader, Mail } from 'lucide-react';
import { useState } from 'react';

interface SignInPageProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignInPage({
    isLoading,
    setIsLoading,
    error,
    setError,
}: SignInPageProps) {
    const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();

    // Sign In Form State
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    });

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signInLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            const result = await signIn.create({
                identifier: signInForm.email,
                password: signInForm.password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                // Redirect or handle successful sign in
                console.log('Sign in successful');
            }
        } catch (err) {
            handleError(err, setError, 'Sign in failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!signInLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/auth/callback',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            handleError(err, setError, 'Google sign in failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (!signInLoaded) {
        return (
            <div className="flex w-full h-full items-center justify-center p-4">
                <Loader className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <CardContent className="space-y-4">
            <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
            >
                <GoogleIcon />
                Continue with Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                        Or continue with email
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-11"
                            value={signInForm.email}
                            onChange={(e) =>
                                setSignInForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <PasswordInput
                        id="signin-password"
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-11"
                        value={signInForm.password}
                        onChange={(e) =>
                            setSignInForm((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        required
                    />
                </div>

                <div id="clerk-captcha"></div>

                <Button
                    onClick={handleSignIn}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Signing in...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </div>
        </CardContent>
    );
}
