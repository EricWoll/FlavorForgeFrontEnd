import IsLoggedIn from '@/features/server/isLoggedIn.server.component';
import EditProfileContent from './editProfile-content';

export default function ExitProfilePage() {
    return (
        <IsLoggedIn>
            <EditProfileContent />
        </IsLoggedIn>
    );
}
