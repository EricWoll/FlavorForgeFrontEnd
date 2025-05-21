'use client';

import { useUserContext } from '@/contexts/User.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import Input from '@/lib/my_custom_components/inputs/input.Form.component';
import { apiGet } from '@/utils/handlerHelpers';
import { useQuery } from '@tanstack/react-query';
import {
    EyeClosedIcon,
    EyeIcon,
    LockIcon,
    MailIcon,
    UserIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ProfilePageContent() {
    const UserContext = useUserContext();
    const window = useWindow();

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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!UserContext.user?.id && !UserContext.loading,
    });

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
        <div className={`mx-4 w-full `}>
            <section
                className={`w-56 h-56 rounded-5 overflow-hidden bg-tinted_gray_600 ${
                    window.windowSize.match(WindowSizes.SMALL) && 'm-auto'
                }`}
            >
                <ImageRequest filename={user.imageId} />
            </section>
            <section className="my-2">
                <section>
                    <label
                        htmlFor="about"
                        className="select-none cursor-default"
                    >
                        About
                    </label>
                    <Input
                        disabled
                        isTextArea
                        value={user.aboutText}
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
                        disabled
                        id="username"
                        marginY="sm"
                        type="text"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        value={user.username}
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
                        disabled
                        id="email"
                        marginY="sm"
                        borderColor="border-tinted_gray_300"
                        size="full"
                        value={user.email}
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
            </section>
            <section className="flex gap-4">
                <Button.Hover
                    onClick={() => signOut()}
                    className="w-full hover:shadow-inset-gray-sm shadow-gray-sm"
                >
                    Log Out
                </Button.Hover>
                <Button.Link
                    href="/user/profile/edit"
                    className="w-full hover:shadow-inset-gray-sm shadow-gray-sm text-center"
                >
                    Edit Profile
                </Button.Link>
            </section>
        </div>
    );
}
