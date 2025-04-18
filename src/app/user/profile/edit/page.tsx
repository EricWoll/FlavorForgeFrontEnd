import { getServerSession } from 'next-auth';

export default async function EditProfilePage() {
    const Session = await getServerSession();

    // if (Session == null) {
    //     redirect('/');
    // }

    return (
        <div>
            <h2>Edit Profile Page</h2>
        </div>
    );
}
