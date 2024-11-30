import { Dispatch, SetStateAction } from 'react';
import ImageRequest from '../Images/request.image.component';
import FollowTile from '../followtile.component';
import Link from 'next/link';

export default function RecipePageInfo({
    recipeCard,
    updateRecipe,
    user,
}: {
    recipeCard: RecipeCard;
    updateRecipe: Dispatch<SetStateAction<RecipeCard | undefined>>;
    user: IUserContextPublic | null;
}) {
    const handleFollowTile = async () => {
        updateRecipe({
            ...recipeCard,
            following: !recipeCard.following,
        });
    };

    return (
        <>
            <section className="flex flex-row flex-wrap w-full gap-10 justify-center">
                {recipeCard?.imageId != 'none' ? (
                    <ImageRequest
                        filename={recipeCard.imageId}
                        imageWidth={250}
                        imageHeight={250}
                    />
                ) : (
                    <div className="w-64 h-64 bg-slate-700 block rounded-md"></div>
                )}

                <section className="mx-10">
                    <section className="flex flex-col items-center gap-1 mb-4">
                        <h2 className="text-3xl">{recipeCard.recipeName}</h2>

                        <span
                            className={`flex flex-nowrap gap-2 border-2 border-gray-500  ${
                                user ? 'pl-2' : 'px-2'
                            } rounded-full items-center`}
                        >
                            <Link
                                className="cursor-pointer select-none"
                                href={{
                                    pathname: '/creator-page',
                                    query: { id: recipeCard.creatorId },
                                }}
                            >
                                {recipeCard.creatorUsername ||
                                    recipeCard?.creator}
                            </Link>
                            {user && (
                                <FollowTile
                                    isFollowed={recipeCard.following}
                                    updateClientFunction={handleFollowTile}
                                    creatorId={recipeCard.creatorId}
                                />
                            )}
                        </span>
                    </section>
                    <p>{recipeCard?.recipeDescription}</p>
                </section>
            </section>
            <section className="flex flex-col w-full px-10 gap-4 mt-5">
                <section>
                    <h3 className="text-2xl">Ingredients</h3>
                    <ul className="rounded-md border-4 border-stroke p-2 w-full list-disc list-inside">
                        {recipeCard?.ingredients.map((ingredient) => (
                            <li key={ingredient.name}>
                                {ingredient.amount} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h3 className="text-2xl">Directions</h3>
                    <ol className="rounded-md border-4 border-stroke p-2 w-full list-decimal list-inside">
                        {recipeCard?.steps.map((step) => (
                            <li key={recipeCard.steps.indexOf(step)}>{step}</li>
                        ))}
                    </ol>
                </section>
            </section>
        </>
    );
}
