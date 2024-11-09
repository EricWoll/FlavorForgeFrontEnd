import NavButton from '@/components/Navigation/navButton.component';
import SearchBar from '@/components/searchBar.component';
import { apiGet } from '@/utils/fetchHelpers';

export default async function Home() {
    const cardsList = await (await apiGet('search/recipes/something')).json(); // Make a Default Search EndPoint!

    return (
        <div className="grow">
            <SearchBar />
        </div>
    );
}
