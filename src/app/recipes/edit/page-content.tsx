'use client';

import { useUserContext } from '@/contexts/User.context';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import EditRecipePageHeader from './page-header';
import { DirectionsDialog, IngredientsDialog } from './page-dialogs';
import DragNDropContext from '@/lib/my_custom_components/dragNdrop/context.dragNdrop.component';
import SortableDnDContainer from '@/lib/my_custom_components/dragNdrop/sortableContainer.dragNdrop.component';
import { nanoid } from 'nanoid';
import SortableItemDnD from '@/lib/my_custom_components/dragNdrop/sortableItem.dragNdrop.component';
import { GripVerticalIcon, X } from 'lucide-react';
import {
    apiDelete,
    apiGet,
    apiPost,
    apiPut,
} from '@/utils/fetch/apiBase.fetch';
import { apiPostForImage } from '@/utils/fetch/image.fetch';

interface DirectionItem {
    id: string;
    direction: string;
}

interface IngredientWithId extends Ingredients {
    id: string;
}

export default function EditRecipePageContent() {
    const searchParams = useSearchParams();

    const recipeId = searchParams.get('id');

    const UserContext = useUserContext();
    const Router = useRouter();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [ingredientList, setIngredientList] = useState<IngredientWithId[]>(
        []
    );
    const [directionsList, setDirectionsList] = useState<DirectionItem[]>([]);
    const [editingIngredient, setEditingIngredient] =
        useState<Ingredients | null>(null);
    const [editingStep, setEditingStep] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const newUUID = crypto.randomUUID();
    const inputRef = useRef<HTMLInputElement>(null);

    const { isPending, error, data } = useQuery<Recipe, Error>({
        queryKey: ['recipe_item_search', recipeId],
        queryFn: () => apiGet(`recipes/search/${recipeId}`),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!recipeId,
    });

    useEffect(() => {
        if (data) {
            setRecipe(data);
            setIngredientList(
                data.ingredients.map((item) => ({ ...item, id: nanoid() }))
            );
            setDirectionsList(
                data.steps.map((step) => ({ id: nanoid(), direction: step }))
            );
        }
    }, [data]);

    const recipeMutation = useMutation({
        mutationFn: async (updatedRecipe: Recipe) => {
            if (updatedRecipe.recipeId) {
                return await apiPut(
                    `recipes/update/${updatedRecipe.recipeId}`,
                    updatedRecipe,
                    UserContext.user?.token
                );
            } else {
                return await apiPost(
                    'recipes/create',
                    {
                        ...updatedRecipe,
                        creatorId: UserContext.user?.id,
                    } as Recipe,
                    UserContext.user?.token
                );
            }
        },
        onSuccess: () => Router.push(`/user?id=${UserContext.user?.id}`),
        onError: () => alert('Failed to update recipe. Please try again.'),
    });

    const imageMutation = useMutation({
        mutationFn: async ({
            file,
            imageId,
            newUUID,
        }: {
            file: File;
            imageId: string;
            newUUID: string;
        }) => {
            return await apiPostForImage(
                'images',
                file,
                imageId,
                newUUID,
                true,
                UserContext.user?.token
            );
        },
        onError: () => alert('Failed to upload image. Please try again.'),
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            if (recipe?.recipeId) {
                return await apiDelete(
                    `recipes/delete/${recipe.recipeId}`,
                    UserContext.user?.token
                );
            }
        },
        onSuccess: () => Router.push(`/user?id=${UserContext.user?.id}`),
        onError: () => alert('Failed to delete recipe.'),
    });

    const handleSubmit = async () => {
        if (
            !recipe ||
            !recipe.recipeName ||
            ingredientList.length <= 0 ||
            directionsList.length <= 0
        ) {
            return;
        }

        try {
            if (file) {
                const isUpdateImage = Boolean(
                    recipe.recipeImageId && recipe.recipeImageId !== 'none'
                );
                await imageMutation.mutateAsync({
                    file,
                    imageId: recipe.recipeImageId || '',
                    newUUID,
                });
            }

            const updatedRecipe = {
                ...recipe,
                ingredients: ingredientList,
                steps: directionsList.map((d) => d.direction),
                imageId: file ? newUUID : recipe.recipeImageId || 'none',
            };

            await recipeMutation.mutateAsync(updatedRecipe);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this recipe?')) {
            deleteMutation.mutate();
        }
    };

    const addStepUpdate = (step: string) => {
        if (step.trim()) {
            setDirectionsList((prev) => [
                ...prev,
                { id: nanoid(), direction: step.trim() },
            ]);
        }
    };

    const removeStepUpdate = (index: number) => {
        setDirectionsList((prev) => prev.filter((_, i) => i !== index));
    };

    const addIngredientUpdate = (ingredient: Ingredients) => {
        if (ingredient.amount && ingredient.ingredientName) {
            setIngredientList((prev) => [
                ...prev,
                { ...ingredient, id: nanoid() },
            ]);
        }
    };

    const removeIngredientUpdate = (index: number) => {
        setIngredientList((prev) => prev.filter((_, i) => i !== index));
    };

    if (isPending && recipeId)
        return (
            <div className="grow w-full">
                <p>Loading recipe...</p>
            </div>
        );

    if (error)
        return (
            <div className="grow w-full">
                <p>An Error Occurred: {error.message}</p>
            </div>
        );

    return (
        <div className="px-4 max-w-5xl w-full ml-auto mr-auto">
            <EditRecipePageHeader
                recipe={recipe}
                setRecipe={setRecipe}
                inputRef={inputRef}
                file={file}
                setFile={setFile}
            />

            {/* Ingredients Section */}
            <section>
                <div className="flex gap-4 mb-2 items-center">
                    <h2 className="text-2xl">Ingredients</h2>
                    <IngredientsDialog
                        nameValue={editingIngredient?.ingredientName || ''}
                        nameOnChange={(e) =>
                            setEditingIngredient(
                                (prev) =>
                                    ({
                                        ...prev,
                                        ingredientName: e.target.value,
                                    } as Ingredients)
                            )
                        }
                        amountValue={editingIngredient?.amount || ''}
                        amountOnChange={(e) =>
                            setEditingIngredient(
                                (prev) =>
                                    ({
                                        ...prev,
                                        amount: e.target.value,
                                    } as Ingredients)
                            )
                        }
                        dialogCloseOnClick={() => {
                            if (editingIngredient) {
                                addIngredientUpdate(editingIngredient);
                                setEditingIngredient(null);
                            }
                        }}
                    />
                </div>
                <div className="shadow-inset-gray-sm p-2 rounded-lg">
                    {ingredientList.length ? (
                        <DragNDropContext
                            list={ingredientList}
                            setList={setIngredientList}
                        >
                            <SortableDnDContainer
                                id="ingredients"
                                itemsList={ingredientList}
                            >
                                {ingredientList.map((ingredient, index) => (
                                    <SortableItemDnD
                                        key={ingredient.id}
                                        id={ingredient.id}
                                        moveDirection="y"
                                        sortableHandle={
                                            <GripVerticalIcon className="w-6 h-6 text-tinted_gray_300" />
                                        }
                                        marginX="none"
                                        bg="bg-tinted_gray_700"
                                        boxShadow="shadow-gray-sm"
                                    >
                                        <div className="flex justify-between items-center w-full">
                                            <p>
                                                {ingredient.amount} |{' '}
                                                {ingredient.ingredientName}
                                            </p>
                                            <X
                                                className="w-4 h-4 text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    removeIngredientUpdate(
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    </SortableItemDnD>
                                ))}
                            </SortableDnDContainer>
                        </DragNDropContext>
                    ) : (
                        <p className="text-tinted_gray_600">
                            No Ingredients for your recipe!
                        </p>
                    )}
                </div>
            </section>

            {/* Directions Section */}
            <section className="my-4">
                <div className="flex gap-4 mb-2 items-center">
                    <h2 className="text-2xl">Directions</h2>
                    <DirectionsDialog
                        directionValue={editingStep || ''}
                        directionOnChange={(e) =>
                            setEditingStep(e.target.value)
                        }
                        dialogCloseOnClick={() => {
                            if (editingStep) {
                                addStepUpdate(editingStep);
                                setEditingStep(null);
                            }
                        }}
                    />
                </div>
                <div className="shadow-inset-gray-sm p-2 rounded-lg">
                    {directionsList.length ? (
                        <DragNDropContext
                            list={directionsList}
                            setList={setDirectionsList}
                        >
                            <SortableDnDContainer
                                id="steps"
                                itemsList={directionsList}
                            >
                                {directionsList.map((step, index) => (
                                    <SortableItemDnD
                                        key={step.id}
                                        id={step.id}
                                        moveDirection="y"
                                        sortableHandle={
                                            <GripVerticalIcon className="w-6 h-6 text-tinted_gray_300" />
                                        }
                                        marginX="none"
                                        bg="bg-tinted_gray_700"
                                        boxShadow="shadow-gray-sm"
                                    >
                                        <div className="flex justify-between items-center w-full">
                                            <p>
                                                {index + 1}. {step.direction}
                                            </p>
                                            <X
                                                className="w-4 h-4 text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    removeStepUpdate(index)
                                                }
                                            />
                                        </div>
                                    </SortableItemDnD>
                                ))}
                            </SortableDnDContainer>
                        </DragNDropContext>
                    ) : (
                        <p className="text-tinted_gray_600">
                            No Directions for your recipe!
                        </p>
                    )}
                </div>
            </section>

            {/* Buttons */}
            <section className="flex gap-2">
                <Button.Hover
                    isOutlined
                    className="w-full"
                    onClick={() =>
                        Router.push(`/user?id=${UserContext.user?.id}`)
                    }
                >
                    Cancel
                </Button.Hover>
                <Button.Hover
                    className="w-full bg-green-400 text-green-800 outline outline-2 outline-green-800"
                    onClick={handleSubmit}
                    disabled={
                        recipeMutation.isPending || imageMutation.isPending
                    }
                >
                    {recipeMutation.isPending || imageMutation.isPending
                        ? 'Saving...'
                        : 'Save'}
                </Button.Hover>
                <Button.Hover
                    className="bg-red-400 w-full text-red-800 outline outline-2 outline-red-800"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button.Hover>
            </section>
        </div>
    );
}
