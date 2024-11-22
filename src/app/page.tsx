import RecipeCard from '@/components/Cards/recipe.Card.component';
import SearchBar from '@/components/searchBar.component';
import { apiGet } from '@/utils/fetchHelpers';

export default async function Home() {
    const cardsList = await apiGet('search/recipes', 'pageAmount=10').then(
        (res) => res.json()
    );

    return (
        <div className="grow">
            <SearchBar />
            <div className="m-2 flex flex-wrap gap-4 justify-center">
                {cardsList.map((cardInfo: RecipeCard) => {
                    return (
                        <RecipeCard key={cardInfo.recipeId} card={cardInfo} />
                    );
                })}
            </div>
        </div>
    );
}
