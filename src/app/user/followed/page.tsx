import IsLoggedIn from '@/features/server/isLoggedIn.server.component';
import FollowedCreatorsContent from './page-content';

export default function FollowedCreatorsPage() {
    return (
        <IsLoggedIn>
            <FollowedCreatorsContent />
        </IsLoggedIn>
    );
}
