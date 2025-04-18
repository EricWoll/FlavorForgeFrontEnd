import { getServerSession } from 'next-auth';
import ProfileView from './profile-view';

export default async function UserProfile() {
    const Session = await getServerSession();

    // if (Session == null) {
    //     redirect('/');
    // }

    return (
        <div className="w-full">
            <section>
                <div className="flex gap-2">
                    <p>Profile</p>
                    <p>Filters</p>
                    <p>Account</p>
                </div>
                <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
            </section>
            <section>
                <ProfileView user={Session?.user} />
            </section>
        </div>
    );
}
