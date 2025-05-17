import IsLoggedIn from '@/features/server/isLoggedIn.server.component';

export default function ExitProfilePage() {
    return (
        <IsLoggedIn>
            <div className="mx-4 w-full">
                <p>Edit Profile Page</p>
            </div>
        </IsLoggedIn>
    );
}
