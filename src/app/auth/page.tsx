'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInPage from './sign-in.page';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import SignUpPage from './sign-up.page';
import { CheckCircle } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/nextjs';

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <div className="flex min-h-screen items-center justify-center flex-col">
            {/* <SignUp routing="hash" />
            <SignIn routing="hash" /> */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger
                            value="signin"
                            className="text-sm font-medium"
                        >
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger
                            value="signup"
                            className="text-sm font-medium"
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>

                    {error && (
                        <Alert className="mb-4 border-red-200 bg-red-50">
                            <AlertDescription className="text-red-700">
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-4 border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-700">
                                {success}
                            </AlertDescription>
                        </Alert>
                    )}

                    <TabsContent value="signin">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl text-center">
                                Sign In to Flavor Forge
                            </CardTitle>
                        </CardHeader>

                        <SignInPage
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            error={error}
                            setError={setError}
                        />
                    </TabsContent>
                    <TabsContent value="signup">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl text-center">
                                Sign Up to Flavor Forge
                            </CardTitle>
                        </CardHeader>
                        <SignUpPage
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            error={error}
                            setError={setError}
                        />
                    </TabsContent>
                </Tabs>
                <CardFooter className="pt-6">
                    <p className="text-xs text-gray-500 text-center w-full">
                        By continuing, you agree to our Terms of Service and
                        Privacy Policy
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
