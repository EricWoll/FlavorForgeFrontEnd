'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormInput } from '../FormElements/input.Form.Component';
import FormTextArea from '../FormElements/textArea.Form.component';
import ImageRequest from '../Images/request.image.component';
import Link from 'next/link';
import ListItemEditor from './recipeItemEditor.component';
import {
    apiDelete,
    apiPost,
    apiPostForImage,
    apiPut,
} from '@/utils/handlerHelpers';
import AddIngredientsForm from './addIngredientsForm.component';
import AddStepsForm from './addStepsForm.components';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/User.context';
import {
    addRecipe,
    deleteRecipe,
    updateRecipe,
} from '@/utils/FetchHelpers/recipes.FetchHelpers';

export default function EditRecipe({
    recipe,
    setRecipeCard,
}: {
    recipe: RecipeCard;
    setRecipeCard: Dispatch<SetStateAction<RecipeCard>>;
}) {
    const { user } = useUserContext();
    const Router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [uploadRecipe, setUploadRecipe] = useState<boolean>(true);
    const newUUID = crypto.randomUUID();

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
        if (
            recipe.recipeName == '' ||
            recipe.ingredients.length <= 0 ||
            recipe.steps.length <= 0
        ) {
            return;
        }

        if (file) {
            const isUpdateImage = recipe.imageId != 'none';
            try {
                await apiPostForImage(
                    'images',
                    file,
                    recipe.imageId,
                    newUUID,
                    isUpdateImage,
                    user?.token
                );
                setUploadRecipe(true);
            } catch (error) {
                console.error('Error with your image upload:', error);
                alert('Failed to upload image. Please try again.');
                setUploadRecipe(false);
            }
        }

        if (uploadRecipe) {
            try {
                const updatedRecipe = {
                    ...recipe,
                    imageId: file ? newUUID : 'none',
                };

                if (recipe.recipeId != null) {
                    await updateRecipe(
                        recipe.recipeId,
                        updatedRecipe,
                        user?.token
                    );
                } else {
                    await addRecipe(updatedRecipe, user?.token);
                }
                Router.push('/my-recipes');
            } catch (error) {
                alert('Failed to update recipe. Please try again.');
                setUploadRecipe(false);
            }
        }
    };
    const handleDelete = async () => {
        try {
            if (recipe.recipeId != null) {
                await deleteRecipe(recipe.recipeId, user?.token);
                Router.push('/my-recipes');
            }
        } catch (error) {
            alert('Failed to Delete Recipe.');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0] || null);
        } else {
            alert('There was an error adding file to recipe.');
        }
    };

    return (
        <>
            <section className="flex flex-row flex-wrap w-full justify-center">
                <section className="flex flex-col items-center gap-2">
                    {recipe != undefined &&
                    recipe?.imageId != 'none' &&
                    !file ? (
                        /* Swap ImageRequest out for Input for images! */
                        <ImageRequest
                            filename={recipe.imageId}
                            imageWidth={256}
                            imageHeight={256}
                        />
                    ) : (
                        <>
                            {file ? (
                                <img
                                    className="h-64"
                                    src={URL.createObjectURL(file)}
                                />
                            ) : (
                                <div className=" w-64 h-64 bg-slate-700 rounded-md"></div>
                            )}
                        </>
                    )}
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                    />
                </section>
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
                            recipe.ingredients.map((ingredient, index) => (
                                <ListItemEditor
                                    onClick={() => {
                                        handleRemoveIngredient(ingredient);
                                    }}
                                    key={index}
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
                            recipe.steps.map((step, index) => (
                                <ListItemEditor
                                    key={index}
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
                {recipe.recipeId != null && (
                    <FormButton
                        buttonText="Delete Recipe"
                        onClick={handleDelete}
                    />
                )}
            </div>
        </>
    );
}
