'use client';

import UserIcon from '@/components/svg/userIcon.svg.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

const dummyImage: string =
    'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image';

export default function ProfileView({ user }: { user: User | undefined }) {
    return (
        <>
            <section className="flex gap-4 items-center">
                <img src={dummyImage} className="w-32 h-32" />
                <div>
                    <p>Username</p>
                    <div className="flex gap-2 max-h-6 overflow-hidden items-center">
                        <UserIcon />
                        <div className="h-10 w-2 border-r border-tinted_gray_100"></div>
                        <p>{user?.username}</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-4 my-4">
                <div>
                    <p>About</p>
                    <div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusantium dolorum dolores labore, quas
                            adipisci aspernatur quos quidem praesentium
                            mollitia, qui dolore. Expedita perspiciatis
                            dignissimos omnis sed enim, dolorem voluptate earum.
                            Delectus, qui eos voluptatibus dolore ad repellat
                            voluptates modi explicabo eius corrupti doloremque
                            ducimus quisquam, nam quam ea magni alias nobis
                            adipisci doloribus saepe. Maiores minus neque
                            inventore iusto voluptatum.
                        </p>
                    </div>
                </div>
                <div>
                    <p>Email</p>
                    <div className="flex gap-2 max-h-6 overflow-hidden items-center">
                        <UserIcon />
                        <div className="h-10 w-2 border-r border-tinted_gray_100"></div>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div>
                    <p>Password</p>
                    <div className="flex gap-2 max-h-6 overflow-hidden items-center">
                        <UserIcon />
                        <div className="h-10 w-2 border-r border-tinted_gray_100"></div>
                        <p>*************</p>
                    </div>
                </div>
            </section>
            <section className="flex justify-between gap-4">
                <Button.Hover
                    isOutlined
                    className="w-full text-center text-tinted_gray_300"
                    onClick={() => {
                        signOut();
                    }}
                >
                    Logout
                </Button.Hover>
                <Button.Link
                    isOutlined
                    className="w-full text-center flex items-center justify-center text-tinted_gray_300"
                    href="/user/profile/edit"
                >
                    Edit Profile
                </Button.Link>
            </section>
        </>
    );
}
