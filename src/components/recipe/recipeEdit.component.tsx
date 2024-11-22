'use client';

import { Key, MouseEventHandler, ReactNode, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormInput } from '../FormElements/input.Form.Component';
import FormTextArea from '../FormElements/textArea.Form.component';
import ImageRequest from '../Images/request.image.component';
import Link from 'next/link';
import ListItemEditor from './recipeItemEditor.component';

export default function EditRecipe({
    recipeInfo,
}: {
    recipeInfo: RecipeCard | undefined;
}) {
    const [recipeTitle, setRecipeTitle] = useState<string>(
        recipeInfo?.recipeName || ''
    );
    const [recipeDescription, setRecipeDescription] = useState<string>(
        recipeInfo?.recipeDescription || ''
    );
    const [recipeIngredients, setRecipeIngredients] = useState<
        Array<IIngredients>
    >(recipeInfo?.ingredients || []);
    const [recipeSteps, setRecipeSteps] = useState<Array<string>>(
        recipeInfo?.steps || []
    );

    const handleRemoveStep = (stepToRemove: string) => {
        setRecipeSteps((prevItems) =>
            prevItems.filter((item) => item !== stepToRemove)
        );
    };

    const handleRemoveIngredient = (ingredientToRemove: IIngredients) => {
        setRecipeIngredients((prevItems) =>
            prevItems.filter((item) => item != ingredientToRemove)
        );
    };

    const handleRecipeSubmit = () => {
        // handle the submiting of the recipe!
        if (recipeInfo?.recipeId) {
        } else {
        }
    };

    return (
        <>
            <section className="flex flex-row flex-wrap w-full justify-center">
                {recipeInfo?.imageId != 'null' && recipeInfo != undefined ? (
                    /* Swap ImageRequest out for Input for images! */
                    <ImageRequest
                        filename={recipeInfo.imageId}
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
                        value={recipeTitle}
                        placeholder="Enter Your Title"
                        onChange={(event) => setRecipeTitle(event.target.value)}
                    />
                    <FormTextArea
                        label="Description"
                        value={recipeDescription}
                        placeholder="Enter Your Description"
                        onChange={(event) =>
                            setRecipeDescription(event.target.value)
                        }
                    />
                </section>
            </section>
            <section className="flex flex-col w-full px-10 gap-4 mt-5">
                <section>
                    <section className="flex flex-row flex-nowrap max-w-72 gap-2 mb-2">
                        <h3 className="text-2xl">Ingredients</h3>
                        {/*
                            Open Add Ingredients form!
                        */}
                        <FormButton
                            buttonText="+ Add Ingredients"
                            onClick={() => {}}
                        />
                    </section>
                    <ul className="rounded-md border-4 border-stroke p-2 w-full list-disc list-inside min-h-10">
                        {recipeIngredients ? (
                            recipeIngredients.map((ingredient) => (
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
                    <section className="flex flex-row flex-nowrap max-w-72 gap-2 mb-2">
                        <h3 className="text-2xl">Directions</h3>
                        {/*
                            Open Add Direction form!
                        */}
                        <FormButton
                            buttonText="+ Add Directions"
                            onClick={() => {}}
                        />
                    </section>

                    <ul className="rounded-md border-4 border-stroke p-2 w-full list-disc list-inside min-h-10">
                        {recipeSteps ? (
                            recipeSteps.map((step) => (
                                <ListItemEditor
                                    key={recipeSteps.indexOf(step)}
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
                <FormButton
                    buttonText="Save Recipe"
                    onClick={() => {
                        handleRecipeSubmit;
                    }}
                />
                <Link className="flex w-full" href="/my-recipes">
                    <FormButton buttonText="Cancel" />
                </Link>
            </div>
        </>
    );
}
