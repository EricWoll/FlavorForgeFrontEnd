'use client';

import UserIcon from '@/components/svg/userIcon.svg.component';
import { useUserContext } from '@/contexts/User.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { FormColumn } from '@/lib/my_custom_components/inputs/column.Form.component';
import FormContainer from '@/lib/my_custom_components/inputs/container.Form.component';
import Input from '@/lib/my_custom_components/inputs/input.Form.component';
import { EyeClosedIcon, EyeIcon, LockIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const Window = useWindow();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleClear = () => {
        setUsernameInput('');
        setPasswordInput('');
    };

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (usernameInput && passwordInput) {
            const result = await signIn('credentials', {
                redirect: false,
                username: usernameInput,
                password: passwordInput,
            });

            if (result?.ok) {
                handleClear();
                router.push('/');
            } else {
                // Optional: Show user feedback here
                console.error('Login failed:', result?.error);
            }
        }
    };

    return (
        <div className="flex flex-col gap-4 px-4 grow h-full items-center justify-center">
            <h2 className="text-3xl select-none text-center cursor-default text-tinted_gray_300">
                Sign In
            </h2>
            <FormContainer
                method="post"
                onSubmit={handleSignIn}
                minWidth={
                    Window.windowSize == WindowSizes.SMALL
                        ? 'min-w-36'
                        : undefined
                }
            >
                <FormColumn>
                    <Input
                        type="text"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        value={usernameInput}
                        placeholder="MyUsername"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setUsernameInput(event.target.value)}
                        leadingIcon={
                            <UserIcon
                                className="w-6 h-6 text-tinted_gray_500 fill-current"
                                fill="currentColor"
                            />
                        }
                    />
                    <Input
                        marginY="lg"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        placeholder={showPassword ? 'Password' : '********'}
                        autoComplete="on"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setPasswordInput(event.target.value)}
                        leadingIcon={
                            <LockIcon
                                className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                stroke="currentColor"
                            />
                        }
                        trailingIcon={
                            showPassword ? (
                                <EyeIcon
                                    className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                    stroke="currentColor"
                                />
                            ) : (
                                <EyeClosedIcon
                                    className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                    stroke="currentColor"
                                />
                            )
                        }
                        onTrailingIconClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                    />
                    <Button.Hover
                        type="submit"
                        isFullWidth
                        isOutlined
                        size="small"
                    >
                        <p className="select-none cursor-pointer">Log In</p>
                    </Button.Hover>
                    <section className="flex flex-row gap-1 items-center text-xs my-2 justify-center">
                        <p className="text-tinted_gray_500 select-none">
                            Don&apos;t have an account?
                        </p>
                        <Button.Link
                            className="text-red-400"
                            size="small"
                            href="/auth/signup"
                        >
                            <p className="select-none cursor-pointer">
                                Create One
                            </p>
                        </Button.Link>
                    </section>
                </FormColumn>
            </FormContainer>
        </div>
    );
}
