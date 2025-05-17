import IsLoggedIn from '@/features/server/isLoggedIn.server.component';

export default async function SettingsPage() {
    return (
        <IsLoggedIn>
            <div>
                <p>Settings Page</p>
            </div>
        </IsLoggedIn>
    );
}
