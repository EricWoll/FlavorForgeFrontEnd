'use client';

import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from 'react';
import FormButton from '../FormElements/button.Form.component';
import ImageRequest from '../Images/request.image.component';
import FormContainer from '../FormElements/container.Form.component';
import { FormColumn } from '../FormElements/column.Form.component';
import { FormEmailInput } from '../FormElements/emailInput.Form.component';
import { FormUsernameInput } from '../FormElements/usernameInput.Form.component';
import FormTextArea from '../FormElements/textArea.Form.component';
import { apiPostForImage, apiPut } from '@/utils/handlerHelpers';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/User.context';
import { updateUser } from '@/utils/FetchHelpers/users.FetchHelpers';
import { updateImage } from '@/utils/FetchHelpers/images.FetchHelpers';

export default function EditUserProfile({
    userProfile,
    setUserProfile,
}: {
    userProfile: EditUser;
    setUserProfile: Dispatch<SetStateAction<EditUser>>;
}) {
    const { user, loading } = useUserContext();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading || !user || !user.id) {
            alert('Error Loading User. Please try again later');
        }

        try {
            if (userProfile.username == '' || userProfile.email == '') {
                alert('Username and email are required.');
                return;
            }
            if (file) {
                const newUUID = crypto.randomUUID();
                const isUpdateImage = userProfile.imageId !== 'none';

                await updateImage(
                    file,
                    userProfile.imageId,
                    newUUID,
                    isUpdateImage,
                    user?.token
                );
                userProfile.imageId = newUUID;
            }
            await updateUser(userProfile, user?.token);
        } catch (error) {
            console.error('Error with your Profile:', error);
            alert('Failed to upload Profile. Please try again.');
        }

        router.push('/profile');
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0] || null);
        }
    };

    return (
        <>
            {userProfile.username != '' && (
                <>
                    <section className="flex w-full items-center flex-col gap-2">
                        {userProfile.imageId !== 'none' ? (
                            /* Swap ImageRequest out for Input for images! */
                            <ImageRequest
                                filename={userProfile.imageId}
                                imageWidth={256}
                                imageHeight={256}
                            />
                        ) : (
                            <>
                                {file ? (
                                    <img
                                        className="h-64"
                                        src={URL.createObjectURL(file)}
                                    />
                                ) : (
                                    <div className="w-64 h-64 bg-slate-700 rounded-md flex items-center justify-center text-white">
                                        No Image
                                    </div>
                                )}
                            </>
                        )}
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </section>

                    <div className="grid gap-3 mb-4">
                        <FormContainer method="put" onSubmit={handleSubmit}>
                            <FormColumn>
                                <FormUsernameInput
                                    value={userProfile.username}
                                    onChange={(event) =>
                                        setUserProfile({
                                            ...userProfile,
                                            username: event.target.value,
                                        })
                                    }
                                />
                                <FormTextArea
                                    label="About"
                                    value={userProfile.aboutText}
                                    onChange={(event) =>
                                        setUserProfile({
                                            ...userProfile,
                                            aboutText: event.target.value,
                                        })
                                    }
                                />
                                <FormEmailInput
                                    value={userProfile.email}
                                    onChange={(event) =>
                                        setUserProfile({
                                            ...userProfile,
                                            email: event.target.value,
                                        })
                                    }
                                />
                                <section className="grid gap-2">
                                    <FormButton
                                        type="submit"
                                        buttonText="update"
                                    />
                                    <FormButton
                                        buttonText="Cancel"
                                        onClick={() => {
                                            router.push('/profile');
                                        }}
                                    />
                                </section>
                            </FormColumn>
                        </FormContainer>
                    </div>
                </>
            )}
        </>
    );
}
