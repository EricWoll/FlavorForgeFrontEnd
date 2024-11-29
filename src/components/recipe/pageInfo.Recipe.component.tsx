import ImageRequest from '../Images/request.image.component';

export default function RecipePageInfo({
    recipeCard,
}: {
    recipeCard: RecipeCard;
}) {
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
                <section>
                    <h2 className="text-3xl text-center">
                        {recipeCard?.recipeName}
                    </h2>
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
