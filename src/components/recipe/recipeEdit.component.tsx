'use client';

import { Dispatch, SetStateAction } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormInput } from '../FormElements/input.Form.Component';
import FormTextArea from '../FormElements/textArea.Form.component';
import ImageRequest from '../Images/request.image.component';
import Link from 'next/link';
import ListItemEditor from './recipeItemEditor.component';
import { apiDelete, apiPost, apiPut } from '@/utils/fetchHelpers';
import { useSession } from 'next-auth/react';
import AddIngredientsForm from './addIngredientsForm.component';
import AddStepsForm from './addStepsForm.components';
import { useRouter } from 'next/navigation';

export default function EditRecipe({
    recipe,
    setRecipeCard,
}: {
    recipe: RecipeCard;
    setRecipeCard: Dispatch<SetStateAction<RecipeCard>>;
}) {
    const { data: session } = useSession();
    const Router = useRouter();

    const handleRemoveStep = (stepToRemove: string) => {
        setRecipeCard({
            ...recipe,
            steps: recipe.steps.filter((item) => item !== stepToRemove),
        });
    };

    const handleRemoveIngredient = (ingredientToRemove: IIngredients) => {
        setRecipeCard({
            ...recipe,
            ingredients: recipe.ingredients.filter(
                (item) => item != ingredientToRemove
            ),
        });
    };

    const handleSubmit = async () => {
        /* information check. Needed info filled. */
        if (
            recipe.recipeName == '' &&
            recipe.ingredients.length <= 0 &&
            recipe.steps.length <= 0
        ) {
            return;
        }

        if (recipe.recipeId != null) {
            await apiPut(
                `recipes/${recipe.recipeId}`,
                recipe,
                session?.user.accessToken
            );
            Router.push('/my-recipes');
        } else if (recipe.recipeId == null) {
            await apiPost('recipes', recipe, session?.user.accessToken);
        }
    };

    const handleDelete = async () => {
        if (recipe.recipeId != null) {
            await apiDelete(
                `recipes/${recipe.recipeId}`,
                session?.user.accessToken
            );
            Router.push('/my-recipes');
        }
    };

    return (
        <>
            <section className="flex flex-row flex-wrap w-full justify-center">
                {recipe?.imageId != 'null' && recipe != undefined ? (
                    /* Swap ImageRequest out for Input for images! */
                    <ImageRequest
                        filename={recipe.imageId}
                        imageWidth={250}
                        imageHeight={250}
                    />
                ) : (
                    <div className="w-64 h-64 bg-slate-700 block rounded-md"></div>
                )}
                <section className="flex flex-col w-full px-10 mt-5">
                    <FormInput
                        label="Title"
                        type="text"
                        value={recipe.recipeName}
                        placeholder="Enter Your Title"
                        onChange={(event) =>
                            setRecipeCard({
                                ...recipe,
                                recipeName: event.target.value,
                            })
                        }
                    />
                    <FormTextArea
                        label="Description"
                        value={recipe.recipeDescription}
                        placeholder="Enter Your Description"
                        onChange={(event) =>
                            setRecipeCard({
                                ...recipe,
                                recipeDescription: event.target.value,
                            })
                        }
                    />
                </section>
            </section>
            <section className="flex flex-col w-full px-10 gap-4 mt-5">
                <section>
                    <h3 className="text-2xl">Ingredients</h3>
                    <AddIngredientsForm
                        recipe={recipe}
                        setRecipe={setRecipeCard}
                    />
                    <ul className="rounded-md border-4 border-stroke p-2 w-full list-disc list-inside">
                        {recipe.ingredients ? (
                            recipe.ingredients.map((ingredient) => (
                                <ListItemEditor
                                    onClick={() => {
                                        handleRemoveIngredient(ingredient);
                                    }}
                                    key={ingredient.name}
                                >
                                    <p>
                                        {ingredient.amount} {ingredient.name}
                                    </p>
                                </ListItemEditor>
                            ))
                        ) : (
                            <p>No Ingredients</p>
                        )}
                    </ul>
                </section>
                <section>
                    <h3 className="text-2xl">Directions</h3>
                    <AddStepsForm recipe={recipe} setRecipe={setRecipeCard} />

                    <ul className="rounded-md border-4 border-stroke p-2 w-full list-decimal list-inside">
                        {recipe.steps ? (
                            recipe.steps.map((step) => (
                                <ListItemEditor
                                    key={recipe.steps.indexOf(step)}
                                    onClick={() => {
                                        handleRemoveStep(step);
                                    }}
                                >
                                    <p>{step}</p>
                                </ListItemEditor>
                            ))
                        ) : (
                            <p>No Directions</p>
                        )}
                    </ul>
                </section>
            </section>
            <div className="w-full px-10 mt-5 grid gap-4">
                <FormButton buttonText="Save Recipe" onClick={handleSubmit} />
                <Link className="flex w-full" href="/my-recipes">
                    <FormButton buttonText="Cancel" />
                </Link>
                <FormButton buttonText="Delete Recipe" onClick={handleDelete} />
            </div>
        </>
    );
}
