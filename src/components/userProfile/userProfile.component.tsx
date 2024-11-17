'use client';

import FormButton from '../FormElements/button.Form.component';
import ImageRequest from '../Images/request.image.component';
import { signOut } from 'next-auth/react';
import FormLink from '../FormElements/link.Form.component';

export default function UserProfile({
    userProfile,
}: {
    userProfile: PublicUser;
}) {
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
                <section>
                    <h2 className="select-none">Username</h2>
                    <p
                        className={`px-4 w-full bg-transparent rounded-md border border-stroke py-1 text-dark-6 bg-grayscale-900`}
                    >
                        {userProfile.username}
                    </p>
                </section>
                <section>
                    <h2 className="select-none">About</h2>
                    <p
                        className={`select-none px-4 w-full bg-transparent rounded-md border border-stroke py-1 text-dark-6 bg-grayscale-900`}
                    >
                        {userProfile.aboutText != ''
                            ? userProfile.aboutText
                            : 'No About Section'}
                    </p>
                </section>
            </div>
            <div className="flex gap-3">
                <FormButton buttonText="Log Out" onClick={() => signOut()} />
                <FormLink href="/profile/edit" linkText="Edit Profile" />
            </div>
        </div>
    );
}
