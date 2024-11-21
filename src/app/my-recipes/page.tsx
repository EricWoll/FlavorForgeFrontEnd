import EditRecipeCard from '@/components/Cards/editRecipe.Card.component';
import SearchBar from '@/components/searchBar.component';
import { authOptions } from '@/utils/authOptions';
import { apiGet } from '@/utils/fetchHelpers';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Page() {
    const session = await getServerSession(authOptions);

    const cardsList: Array<RecipeCard> = await apiGet(
        `recipes/users/${session?.user.userId}`
    ).then((res) => res.json());

    return (
        <div className="grow relative">
            <Link
                href="/recipe/edit"
                className="absolute bottom-5 right-10 text-2xl cursor-pointer select-none bg-slate-400 text-slate-900 hover:bg-slate-600 hover:text-slate-200 flex justify-center items-center p-3 rounded-full"
            >
                Add Recipe
            </Link>
            <SearchBar />
            <div className="m-2 flex flex-wrap gap-4 justify-center">
                {cardsList.length > 0 ? (
                    cardsList.map((cardInfo: RecipeCard) => {
                        return (
                            <EditRecipeCard
                                key={cardInfo.recipeId}
                                card={cardInfo}
                            />
                        );
                    })
                ) : (
                    <p>You have no Recipes!</p>
                )}
            </div>
        </div>
    );
}
