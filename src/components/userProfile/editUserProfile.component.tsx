'use client';

import { FormEvent, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import ImageRequest from '../Images/request.image.component';
import FormContainer from '../FormElements/container.Form.component';
import { FormColumn } from '../FormElements/column.Form.component';
import { FormEmailInput } from '../FormElements/emailInput.Form.component';
import { FormUsernameInput } from '../FormElements/usernameInput.Form.component';
import FormPassword from '../FormElements/passwordInput.Form.component';
import FormTextArea from '../FormElements/textArea.Form.component';
import { apiPut } from '@/utils/fetchHelpers';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function EditUserProfile({
    userProfile,
}: {
    userProfile: EditUser;
}) {
    const { data: session } = useSession();

    const [username, setUsername] = useState<string>(userProfile.username);
    const [email, setEmail] = useState<string>(userProfile.email);
    const [password, setPassword] = useState<string>(userProfile.password);
    const [aboutText, setAboutText] = useState<string>(userProfile.aboutText);

    const handleClear = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setAboutText('');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username != '' && password != '' && email != '') {
            await apiPut(
                `users/${userProfile.username}`,
                {
                    username: username,
                    email: email,
                    password: password,
                    aboutText: aboutText,
                    imageId: 'null',
                },
                session?.user.accessToken
            );
            handleClear();
        }
    };

    return (
        <div className="grow mx-4">
            <section className="flex w-full justify-center">
                {userProfile.imageId != 'null' ? (
                    <ImageRequest
                        filename={userProfile.imageId.toString()}
                        imageWidth={250}
                        imageHeight={250}
                    />
                ) : (
                    <div className="w-64 h-64 bg-slate-700"></div>
                )}
            </section>

            <div className="grid gap-3 mb-4">
                <FormContainer method="put" onSubmit={handleSubmit}>
                    <FormColumn>
                        <FormUsernameInput
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                        <FormTextArea
                            label="About"
                            value={aboutText}
                            onChange={(event) =>
                                setAboutText(event.target.value)
                            }
                        />
                        <FormEmailInput
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <FormPassword
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <FormButton type="submit" buttonText="update" />
                        <Link className="flex w-full" href="/profile">
                            <FormButton
                                buttonText="Cancel"
                                onClick={() => {
                                    handleClear();
                                }}
                            />
                        </Link>
                    </FormColumn>
                </FormContainer>
            </div>
        </div>
    );
}
