import { dummyRecipes } from '@/data/dummyData';
import RecipePageInfo from './pageInfo.recipe';
import CommentsContainer from '@/features/comments/components/container.comments.component';

interface RecipePageProps {
    params: Promise<{
        recipeId: string;
    }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
    const { recipeId } = await params;

    const currentRecipe = dummyRecipes.find(
        (recipe) => recipe.recipeId === recipeId
    );

    return (
        <div className="mx-4 w-full">
            <RecipePageInfo currentRecipe={currentRecipe} />
            <section className="">
                <h2 className="text-2xl">Ingredients</h2>
                <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                    {currentRecipe?.recipeIngredients.map(
                        (ingredient, index) => (
                            <div key={index}>
                                <p>
                                    {ingredient.amount} | {ingredient.name}
                                </p>
                                {currentRecipe.recipeIngredients.length >
                                    index + 1 && (
                                    <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                                )}
                            </div>
                        )
                    )}
                </div>
            </section>
            <section className="my-4">
                <h2 className="text-2xl">Directions</h2>
                <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                    {currentRecipe?.recipeSteps.map((step, index) => (
                        <div key={index}>
                            <p>
                                {index + 1}. {step}
                            </p>
                            {currentRecipe.recipeSteps.length > index + 1 && (
                                <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <CommentsContainer />
        </div>
    );
}
