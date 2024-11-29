'use client';

import FormButton from '@/components/FormElements/button.Form.component';
import { FormColumn } from '@/components/FormElements/column.Form.component';
import FormContainer from '@/components/FormElements/container.Form.component';
import { FormEmailInput } from '@/components/FormElements/emailInput.Form.component';
import FormPassword from '@/components/FormElements/passwordInput.Form.component';
import { FormUsernameInput } from '@/components/FormElements/usernameInput.Form.component';
import { useUserContext } from '@/contexts/User.context';
import { apiPost } from '@/utils/fetchHelpers';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';

export default function Page(): ReactNode {
    const { user, loading } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (loading || !user || !user.userId) return; // Skip API call during loading or if no user

        if (!user?.userId) {
            router.push('/'); // Redirect if not logged in
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

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (usernameInput && passwordInput && emailInput) {
            await apiPost('auth/register', {
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
        }
    };

    if (loading) {
        return <div>Loading SignIn... </div>;
    }

    return (
        <div className="grow flex gap-8 justify-center items-center min-w-80">
            {isSignIn ? (
                <FormContainer method="post" onSubmit={handleSignIn}>
                    <FormColumn>
                        <FormUsernameInput
                            value={usernameInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setUsernameInput(event.target.value)
                            }
                        />
                        <FormPassword
                            value={passwordInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setPasswordInput(event.target.value)
                            }
                        />
                        <FormButton buttonText="Sign In" type="submit" />
                    </FormColumn>
                </FormContainer>
            ) : (
                <FormContainer method="post" onSubmit={handleRegister}>
                    <FormColumn>
                        <FormEmailInput
                            value={emailInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setEmailInput(event.target.value)
                            }
                        />
                        <FormUsernameInput
                            value={usernameInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setUsernameInput(event.target.value)
                            }
                        />
                        <FormPassword
                            value={passwordInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setPasswordInput(event.target.value)
                            }
                        />
                        <FormButton buttonText="Register" type="submit" />
                    </FormColumn>
                </FormContainer>
            )}
            <section className="flex flex-col gap-1">
                <h2
                    className="cursor-pointer"
                    onClick={() => setIsSignIn(true)}
                >
                    Sign In
                </h2>
                <hr />
                <h2
                    className="cursor-pointer"
                    onClick={() => setIsSignIn(false)}
                >
                    Register
                </h2>
            </section>
        </div>
    );
}
