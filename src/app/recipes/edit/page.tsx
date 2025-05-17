import IsLoggedIn from '@/features/server/isLoggedIn.server.component';
import EditRecipePageContent from './page-content';

export default function EditRecipePage() {
    return (
        <IsLoggedIn>
            <EditRecipePageContent />
        </IsLoggedIn>
    );
}
