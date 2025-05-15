'use client';

import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { FormColumn } from '@/lib/my_custom_components/inputs/components/column.Form.component';
import FormContainer from '@/lib/my_custom_components/inputs/components/container.Form.component';
import Input from '@/lib/my_custom_components/inputs/components/input.Form.component';
import { apiPost } from '@/utils/handlerHelpers';
import {
    EyeClosedIcon,
    EyeIcon,
    LockIcon,
    MailIcon,
    UserIcon,
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
    const Window = useWindow();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClear = () => {
        setUsernameInput('');
        setPasswordInput('');
        setEmailInput('');
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!usernameInput || !passwordInput || !emailInput) return;

        setIsSubmitting(true);

        try {
            await apiPost('auth/signup', {
                email: emailInput,
                username: usernameInput,
                password: passwordInput,
            });
            await signIn('credentials', {
                redirect: false,
                username: usernameInput,
                password: passwordInput,
            });
            handleClear();
            router.push('/');
        } catch (err) {
            console.error('Registration failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col mx-4 grow items-center justify-center">
            <h2 className="text-3xl select-none cursor-default text-tinted_gray_300">
                Create An Account
            </h2>
            <FormContainer
                method="post"
                onSubmit={handleRegister}
                minWidth={
                    Window.windowSize == WindowSizes.SMALL
                        ? 'min-w-36'
                        : undefined
                }
            >
                <FormColumn>
                    <Input
                        marginY="sm"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        value={emailInput}
                        placeholder="myEmail@email.com"
                        type="email"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setEmailInput(event.target.value)}
                        leadingIcon={
                            <MailIcon
                                className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                stroke="currentColor"
                            />
                        }
                    />
                    <Input
                        type="text"
                        marginY="sm"
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
                        marginY="sm"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        placeholder={showPassword ? 'Password' : '********'}
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
                        className="mt-2"
                        type="submit"
                        isFullWidth
                        isOutlined
                        size="small"
                        isDisabled={isSubmitting}
                        disabled={isSubmitting}
                    >
                        <p className="select-none cursor-pointer">Create</p>
                    </Button.Hover>
                    <section className="flex flex-row gap-1 items-center text-xs my-2 justify-center">
                        <p className="text-tinted_gray_500 select-none">
                            Already Have an Account?
                        </p>
                        <Button.Link
                            className="text-red-400"
                            size="small"
                            href="/auth/login"
                        >
                            <p className="select-none cursor-pointer">Login</p>
                        </Button.Link>
                    </section>
                </FormColumn>
            </FormContainer>
        </div>
    );
}
