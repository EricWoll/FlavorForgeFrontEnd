'use client';

import FormButton from '@/components/FormElements/button.Form.component';
import { FormColumn } from '@/components/FormElements/column.Form.component';
import FormContainer from '@/components/FormElements/container.Form.component';
import { FormEmailInput } from '@/components/FormElements/emailInput.Form.component';
import FormPassword from '@/components/FormElements/passwordInput.Form.component';
import { FormUsernameInput } from '@/components/FormElements/usernameInput.Form.component';
import { apiPost } from '@/utils/fetchHelpers';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FormEvent, ReactNode, useState } from 'react';

export default function Page(): ReactNode {
    const { data: session } = useSession();
    if (session?.user) {
        redirect('/');
    }

    const [emailInput, setEmailInput] = useState<string>('');
    const [userameInput, setUserameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');

    const [isSignIn, setIsSignIn] = useState<boolean>(true);

    const handleClear = () => {
        setUserameInput('');
        setPasswordInput('');
    };

    const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userameInput != '' && passwordInput != '') {
            signIn('credentials', {
                username: userameInput,
                password: passwordInput,
            });
            handleClear();
        }
    };

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userameInput != '' && passwordInput != '' && emailInput != '') {
            await apiPost('auth/register', {
                email: emailInput,
                username: userameInput,
                password: passwordInput,
            });
            signIn('credentials', {
                username: userameInput,
                password: passwordInput,
            });
        }
        handleClear();
    };

    return (
        <div className="grow flex gap-8 justify-center items-center min-w-80">
            {isSignIn ? (
                <FormContainer method="post" onSubmit={handleSignIn}>
                    <FormColumn>
                        <FormUsernameInput
                            value={userameInput}
                            onChange={setUserameInput}
                        />
                        <FormPassword
                            value={passwordInput}
                            onChange={setPasswordInput}
                        />
                        <FormButton buttonText="Submit" type="submit" />
                    </FormColumn>
                </FormContainer>
            ) : (
                <FormContainer method="post" onSubmit={handleRegister}>
                    <FormColumn>
                        <FormEmailInput
                            value={emailInput}
                            onChange={setEmailInput}
                        />
                        <FormUsernameInput
                            value={userameInput}
                            onChange={setUserameInput}
                        />
                        <FormPassword
                            value={passwordInput}
                            onChange={setPasswordInput}
                        />
                        <FormButton buttonText="Submit" type="submit" />
                    </FormColumn>
                </FormContainer>
            )}
            <section className="flex flex-col gap-1">
                <h2
                    className={`cursor-pointer`}
                    onClick={() => {
                        setIsSignIn(true);
                    }}
                >
                    Sign In
                </h2>
                <hr />
                <h2
                    className={`cursor-pointer`}
                    onClick={() => {
                        setIsSignIn(false);
                    }}
                >
                    Register
                </h2>
            </section>
        </div>
    );
}
