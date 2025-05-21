import IsLoggedIn from '@/features/server/isLoggedIn.server.component';
import ProfilePageContent from './profile-content';

export default function ProfilePage() {
    return (
        <IsLoggedIn>
            <ProfilePageContent />
        </IsLoggedIn>
    );
}
