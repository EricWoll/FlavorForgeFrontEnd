'use client';

import UserIcon from '@/components/svg/userIcon.svg.component';
import { useUserContext } from '@/contexts/User.context';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { FormColumn } from '@/lib/my_custom_components/inputs/components/column.Form.component';
import FormContainer from '@/lib/my_custom_components/inputs/components/container.Form.component';
import Input from '@/lib/my_custom_components/inputs/components/input.Form.component';
import { EyeClosedIcon, EyeIcon, LockIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function LoginPage() {
    const { user, loading } = useUserContext();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (loading || !user || !user.id) return; // Skip API call during loading or if no user

        if (user.id) {
            router.push('/'); // Redirect if logged in
        }
    }, [user, router]);

    const [isSignIn, setIsSignIn] = useState(true);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const handleClear = () => {
        setUsernameInput('');
        setPasswordInput('');
        setEmailInput('');
    };

    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (usernameInput && passwordInput) {
            await signIn('credentials', {
                redirect: false,
                username: usernameInput,
                password: passwordInput,
            });
            handleClear();
            router.push('/');
        }
    };

    return (
        <div className="flex flex-col flex-nowrap mx-4 grow items-center justify-center">
            <h2 className="text-3xl select-none cursor-default text-tinted_gray_300">
                Log In
            </h2>
            <FormContainer method="post" onSubmit={handleSignIn}>
                <FormColumn>
                    <Input
                        borderColor="tinted_gray_300"
                        size="full"
                        value={usernameInput}
                        placeholder="MyUsername"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setUsernameInput(event.target.value)
                        }
                        leadingIcon={
                            <UserIcon
                                className="w-6 h-6 text-tinted_gray_300 fill-current"
                                fill="currentColor"
                            />
                        }
                    />
                    <Input
                        borderColor="tinted_gray_300"
                        size="full"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        placeholder="*************"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setPasswordInput(event.target.value)
                        }
                        leadingIcon={
                            <LockIcon
                                className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                stroke="currentColor"
                            />
                        }
                        trailingIcon={
                            showPassword ? (
                                <EyeIcon
                                    className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                    stroke="currentColor"
                                />
                            ) : (
                                <EyeClosedIcon
                                    className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                    stroke="currentColor"
                                />
                            )
                        }
                        onTrailingIconClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                    />
                    <Button.Hover type="submit" isFullWidth isOutlined>
                        Sign In
                    </Button.Hover>
                    <section className="flex flex-row gap-2 items-center text-sm my-1 justify-center">
                        <p className="text-tinted_gray_500">
                            Don't have an account?
                        </p>
                        <Button.Link
                            className="text-red-400"
                            size="small"
                            href="/auth/signup"
                        >
                            Create One
                        </Button.Link>
                    </section>
                </FormColumn>
            </FormContainer>
        </div>
    );
}
