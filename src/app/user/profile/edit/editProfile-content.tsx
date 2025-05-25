'use client';

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useUserContext } from '@/contexts/User.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import Input from '@/lib/my_custom_components/inputs/input.Form.component';
import { apiGet, apiPut } from '@/utils/fetch/apiBase.fetch';
import { apiPostForImage } from '@/utils/fetch/image.fetch';
import { Dialog } from '@radix-ui/react-dialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    EyeClosedIcon,
    EyeIcon,
    LockIcon,
    MailIcon,
    UserIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProfileContent() {
    const UserContext = useUserContext();
    const window = useWindow();

    const Router = useRouter();

    const [emailInput, setEmailInput] = useState<string>('');
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [aboutText, setAboutText] = useState<string>('');

    // const [currentPassword, setCurrentPassword] = useState<string>('');
    // const [showCurrentPassword, setShowCurrentPassword] =
    //     useState<boolean>(false);
    // const [newPassword, setNewPassword] = useState<string>('');
    // const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    const [file, setFile] = useState<File | null>(null);
    const newUUID = crypto.randomUUID();

    const {
        data: user,
        isPending,
        error,
    } = useQuery({
        queryKey: ['user_profile'],
        queryFn: () =>
            apiGet<PrivateUser>(
                `users/profile/${UserContext.user?.id}`,
                undefined,
                UserContext.user?.token
            ),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!UserContext.user?.id && !UserContext.loading,
    });

    const userMutation = useMutation({
        mutationFn: async (updatedUser: PrivateUser) => {
            return await apiPut<PrivateUser>(
                `users/update/${user?.userId}`,
                updatedUser,
                UserContext.user?.token
            );
        },
        onSuccess: () => Router.push(`/user/profile`),
        onError: () => alert('Failed to update User. Please try again.'),
    });

    const imageMutation = useMutation({
        mutationFn: async ({
            file,
            imageId,
            newUUID,
        }: {
            file: File;
            imageId: string;
            newUUID: string;
        }) => {
            return await apiPostForImage(
                'images',
                file,
                imageId,
                newUUID,
                true,
                UserContext.user?.token
            );
        },
        onError: () => alert('Failed to upload image. Please try again.'),
    });

    const handleSubmit = async () => {
        if (usernameInput.length < 1 || emailInput.length < 1) {
            return;
        }

        try {
            if (file) {
                const isUpdateImage = Boolean(
                    user?.imageId && user?.imageId !== 'none'
                );
                await imageMutation.mutateAsync({
                    file,
                    imageId: user?.imageId || '',
                    newUUID,
                });
            }

            const updatedUser = {
                ...user,
                username:
                    usernameInput.length > 0 ? usernameInput : user?.username,
                email: emailInput.length > 0 ? emailInput : user?.email,
                aboutText:
                    aboutText.length > 0 ? aboutText : user?.aboutText || '',
                imageId: file ? newUUID : user?.imageId || 'none',
            } as PrivateUser;

            await userMutation.mutateAsync(updatedUser);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!user) return;

        setEmailInput(user.email);
        setUsernameInput(user.username);
        setAboutText(user.aboutText);
    }, [user?.userId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0] || null);
        } else {
            alert('There was an error adding file to recipe.');
        }
    };

    if (isPending)
        return (
            <div className="grow w-full">
                <p>Loading user...</p>
            </div>
        );

    if (error)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {error.message}</p>
            </div>
        );

    return (
        <div className="px-4 mb-4 w-full">
            <div className={`flex flex-col gap-1`}>
                <section
                    className={`w-56 h-56 rounded-5 overflow-hidden bg-tinted_gray_600 ${
                        window.windowSize.match(WindowSizes.SMALL) && 'm-auto'
                    }`}
                >
                    {user.imageId != undefined &&
                    user.imageId != 'none' &&
                    !file ? (
                        <div className="w-64 h-64 bg-tinted_gray_600 rounded-5 overflow-hidden">
                            <ImageRequest filename={user.imageId} />
                        </div>
                    ) : (
                        <>
                            {file ? (
                                <img
                                    className="h-64"
                                    src={URL.createObjectURL(file)}
                                />
                            ) : (
                                <div className="w-64 h-64 rounded-5 bg-tinted_gray_600"></div>
                            )}
                        </>
                    )}
                </section>
                <input
                    className={`select-none ${
                        window.windowSize.match(WindowSizes.SMALL) && 'm-auto'
                    }`}
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                />
            </div>
            <div className="my-2">
                <section>
                    <label
                        htmlFor="about"
                        className="select-none cursor-default"
                    >
                        About
                    </label>
                    <Input
                        resize="y"
                        isTextArea
                        onChange={(e) => setAboutText(e.target.value)}
                        value={aboutText}
                        size="full"
                        paddingX="none"
                        paddingY="none"
                        borderColor="border-tinted_gray_500"
                    />
                </section>
                <section>
                    <label
                        htmlFor="username"
                        className="select-none cursor-default"
                    >
                        Username
                    </label>
                    <Input
                        id="username"
                        marginY="sm"
                        type="text"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        onChange={(e) => setUsernameInput(e.target.value)}
                        value={usernameInput}
                        placeholder="MyUsername"
                        leadingIcon={
                            <UserIcon
                                className="w-6 h-6 text-tinted_gray_500 fill-current"
                                fill="currentColor"
                            />
                        }
                    />
                </section>
                <section>
                    <label
                        htmlFor="email"
                        className="select-none cursor-default"
                    >
                        Email
                    </label>
                    <Input
                        id="email"
                        marginY="sm"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        onChange={(e) => setEmailInput(e.target.value)}
                        value={emailInput}
                        placeholder="myEmail@email.com"
                        type="email"
                        leadingIcon={
                            <MailIcon
                                className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                stroke="currentColor"
                            />
                        }
                    />
                </section>
                <section className="my-5">
                    <p className="select-none cursor-default">Password</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button.Hover
                                size="small"
                                isOutlined
                                className="text-tinted_gray_300"
                            >
                                Change Password
                            </Button.Hover>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="select-none cursor-default">
                                    Change Password
                                </DialogTitle>
                            </DialogHeader>
                            <div>
                                <p className="text-center text-tinted_gray_500 select-none cursor-default">
                                    Comming Soon!
                                </p>
                                {/* <section className="flex flex-col gap-1">
                                    <label
                                        htmlFor="currentPassword"
                                        className="select-none cursor-default"
                                    >
                                        Current Password
                                    </label>
                                    <Input
                                        id="currentPassword"
                                        marginY="lg"
                                        borderColor="border-tinted_gray_300"
                                        size="full"
                                        type={
                                            showCurrentPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={currentPassword}
                                        placeholder={
                                            showCurrentPassword
                                                ? 'Current Password'
                                                : '********'
                                        }
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setCurrentPassword(
                                                event.target.value
                                            )
                                        }
                                        leadingIcon={
                                            <LockIcon
                                                className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                                stroke="currentColor"
                                            />
                                        }
                                        trailingIcon={
                                            showCurrentPassword ? (
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
                                            setShowCurrentPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    />
                                </section>
                                <section className="flex flex-col gap-1">
                                    <label
                                        htmlFor="newPassword"
                                        className="select-none cursor-default"
                                    >
                                        New Password
                                    </label>
                                    <Input
                                        id="newPassword"
                                        marginY="lg"
                                        borderColor="border-tinted_gray_300"
                                        size="full"
                                        type={
                                            showNewPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={newPassword}
                                        placeholder={
                                            showNewPassword
                                                ? 'New  Password'
                                                : '********'
                                        }
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => setNewPassword(event.target.value)}
                                        leadingIcon={
                                            <LockIcon
                                                className="w-6 h-6 text-tinted_gray_500 stroke-current"
                                                stroke="currentColor"
                                            />
                                        }
                                        trailingIcon={
                                            showNewPassword ? (
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
                                            setShowNewPassword((prev) => !prev)
                                        }
                                    />
                                </section> */}
                            </div>
                        </DialogContent>
                    </Dialog>
                </section>
            </div>
            <section className="flex gap-4">
                <Button.Link
                    href="/user/profile"
                    className="w-full text-center hover:shadow-inset-gray-sm shadow-gray-sm"
                >
                    cancel
                </Button.Link>
                <Button.Hover
                    onClick={handleSubmit}
                    className="w-full hover:shadow-inset-gray-sm shadow-gray-sm"
                >
                    Save
                </Button.Hover>
            </section>
        </div>
    );
}
