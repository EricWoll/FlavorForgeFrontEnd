import IsLoggedIn from '@/features/server/isLoggedIn.server.component';
import LikedRecipesContent from './likedRecipes-content';

export default function LikedRecipesPage() {
    return (
        <IsLoggedIn>
            <LikedRecipesContent />
        </IsLoggedIn>
    );
}
