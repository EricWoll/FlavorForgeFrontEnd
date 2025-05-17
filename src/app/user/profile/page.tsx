import IsLoggedIn from '@/features/server/isLoggedIn.server.component';

export default function ProfilePage() {
    return (
        <IsLoggedIn>
            <div className="mx-4 w-full">
                <p>Profile Page</p>
            </div>
        </IsLoggedIn>
    );
}
