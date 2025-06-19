'use client';

import PasswordInput from '@/components/custom/password.custom.component';
import GoogleIcon from '@/components/svg/googleIcon.svg.component';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import handleError from '@/utils/errors/error.set';
import { useSignUp } from '@clerk/nextjs';
import {
    Loader,
    Mail,
    User,
    CheckCircle,
    ArrowLeft,
    AlertCircle,
    RefreshCw,
} from 'lucide-react';
import { useState } from 'react';
import TurnstileCaptcha, {
    useTurnstileCaptcha,
} from '@/components/custom/turnstile-captcha.component';

interface SignUpPageProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpPage({
    isLoading,
    setIsLoading,
    error,
    setError,
}: SignUpPageProps) {
    const {
        isLoaded: signUpLoaded,
        signUp,
        setActive: setActiveSignUp,
    } = useSignUp();

    // Sign Up Form State
    const [signUpForm, setSignUpForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Verification State
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signUpLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            // Clerk will automatically handle CAPTCHA verification if enabled in dashboard
            const result = await signUp.create({
                username: signUpForm.username,
                emailAddress: signUpForm.email,
                password: signUpForm.password,
            });

            if (result.status === 'missing_requirements') {
                // Email verification is required
                setShowVerification(true);
                setSuccess('Verification code sent to your email!');
            } else if (result.status === 'complete') {
                await setActiveSignUp({ session: result.createdSessionId });
                console.log('Sign up successful');
            }
        } catch (err: any) {
            handleError(err, setError, 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signUpLoaded || !verificationCode.trim()) return;

        setIsVerifying(true);
        setError('');
        setSuccess('');

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: verificationCode,
                }
            );

            if (completeSignUp.status === 'complete') {
                await setActiveSignUp({
                    session: completeSignUp.createdSessionId,
                });
                setSuccess('Email verified successfully!');
                console.log('Verification successful');
            } else {
                setError('Verification incomplete. Please try again.');
            }
        } catch (err: any) {
            if (err.errors?.[0]?.code === 'verification_failed') {
                setError(
                    'Invalid verification code. Please check and try again.'
                );
            } else {
                handleError(err, setError, 'Verification failed');
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendCode = async () => {
        if (!signUpLoaded) return;

        setIsResending(true);
        setError('');
        setSuccess('');

        try {
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });
            setSuccess('New verification code sent! Check your email.');
        } catch (err) {
            handleError(err, setError, 'Failed to resend code');
        } finally {
            setIsResending(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!signUpLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/auth/callback',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            handleError(err, setError, 'Google sign up failed');
        } finally {
            setIsLoading(false);
        }
    };

    const goBackToSignUp = () => {
        setShowVerification(false);
        setVerificationCode('');
        setError('');
        setSuccess('');
    };

    if (!signUpLoaded) {
        return (
            <div className="flex w-full h-full items-center justify-center p-4">
                <Loader className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    // Show verification form
    if (showVerification) {
        return (
            <>
                <CardHeader className="pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Verify Your Email</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                        We've sent a verification code to{' '}
                        <span className="font-medium text-gray-900">
                            {signUpForm.email}
                        </span>
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {success && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-700">
                                {success}
                            </AlertDescription>
                        </Alert>
                    )}

                    {error && (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700">
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleVerification} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="verification-code">
                                Verification Code
                            </Label>
                            <Input
                                id="verification-code"
                                type="text"
                                placeholder="Enter 6-digit code"
                                className="h-11 text-center text-lg tracking-widest"
                                value={verificationCode}
                                onChange={(e) => {
                                    const value = e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 6);
                                    setVerificationCode(value);
                                    if (error) setError('');
                                }}
                                maxLength={6}
                                required
                                autoComplete="one-time-code"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            disabled={
                                isVerifying || verificationCode.length !== 6
                            }
                        >
                            {isVerifying ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Verifying...
                                </div>
                            ) : (
                                'Verify Email'
                            )}
                        </Button>
                    </form>

                    <div className="space-y-3">
                        <div className="text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleResendCode}
                                disabled={isResending}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                {isResending ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-2"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    "Didn't receive the code? Resend"
                                )}
                            </Button>
                        </div>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={goBackToSignUp}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-3 w-3 mr-1" />
                                Back to sign up
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </>
        );
    }

    // Show regular sign up form
    return (
        <CardContent className="space-y-4">
            <Button
                onClick={handleGoogleSignUp}
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
            >
                <GoogleIcon />
                Sign up with Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                        Or create account with email
                    </span>
                </div>
            </div>

            {/* Display success messages */}
            {success && (
                <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                        {success}
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            id="signup-username"
                            type="text"
                            placeholder="Choose a username"
                            className="pl-10 h-11"
                            value={signUpForm.username}
                            onChange={(e) => {
                                setSignUpForm((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }));
                                // Clear errors when user starts typing
                                if (error) setError('');
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-11"
                            value={signUpForm.email}
                            onChange={(e) => {
                                setSignUpForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }));
                                // Clear errors when user starts typing
                                if (error) setError('');
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <PasswordInput
                        id="signup-password"
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-11"
                        value={signUpForm.password}
                        onChange={(e) => {
                            setSignUpForm((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }));
                            // Clear errors when user starts typing
                            if (error) setError('');
                        }}
                        required
                    />
                </div>

                <div id="clerk-captcha"></div>

                <Button
                    type="submit"
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating account...
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </Button>
            </form>
        </CardContent>
    );
}
