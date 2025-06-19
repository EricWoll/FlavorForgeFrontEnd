'use client';

import { useUserContext } from '@/contexts/user.context';
import {
    apiDelete,
    apiGet,
    apiPost,
    apiPut,
} from '@/utils/fetch/apiBase.fetch';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DirectionsDialog, IngredientsDialog } from './recipeDialogs.page';
import SortableItemDnD from '@/lib/my_custom_components/dragNdrop/sortableItem.dragNdrop.component';
import SortableDnDContainer from '@/lib/my_custom_components/dragNdrop/sortableContainer.dragNdrop.component';
import DragNDropContext from '@/lib/my_custom_components/dragNdrop/context.dragNdrop.component';
import { GripVerticalIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useImageUploadMutation } from '@/hooks/image-upload.hook';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import RecipeImageUploader from '@/components/custom/imageUpload.custom.component';

interface RecipeEditPageContentProps {
    recipeId?: string | undefined | null;
}

interface DirectionItem {
    id: string;
    direction: string;
}

interface IngredientWithId extends Ingredients {
    id: string;
}

export default function RecipeEditPageContent({
    recipeId,
}: RecipeEditPageContentProps) {
    const { user, getToken } = useUserContext();
    const Router = useRouter();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [ingredientList, setIngredientList] = useState<IngredientWithId[]>(
        []
    );
    const [directionList, setDirectionList] = useState<DirectionItem[]>([]);

    const [editingIngredient, setEditingIngredient] =
        useState<Ingredients | null>(null);
    const [editingStep, setEditingStep] = useState<string | null>(null);

    const uploaderRef = useRef<{
        handleUpload: () => Promise<string | null>;
    }>(null);

    const {
        isPending: isRecipePending,
        error,
        data: recipeData,
    } = useQuery<Recipe, Error>({
        queryKey: ['recipe_item_search', recipeId],
        queryFn: async () => {
            const token = await getToken();
            return await apiGet(`recipes/search/${recipeId}`, undefined, token);
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!recipeId,
    });

    useEffect(() => {
        if (recipeData) {
            setRecipe(recipeData);

            setIngredientList(
                recipeData.ingredients.map((item) => ({
                    ...item,
                    id: nanoid(),
                }))
            );

            setDirectionList(
                recipeData.steps.map((step) => ({
                    id: nanoid(),
                    direction: step,
                }))
            );
        }
    }, [recipeData]);

    const recipeMutation = useMutation({
        mutationFn: async (updatedRecipe: Recipe) => {
            const token = await getToken();

            if (updatedRecipe.recipeId) {
                return await apiPut(
                    `recipes/update/${updatedRecipe.recipeId}`,
                    updatedRecipe,
                    token
                );
            } else {
                return await apiPost(
                    'recipes/create',
                    {
                        ...updatedRecipe,
                        creatorId: user?.userId,
                    } as Recipe,
                    token
                );
            }
        },
        onSuccess: () => Router.push(`/users/${user?.userId}/recipes`),
        onError: () => alert('Failed to update recipe. Please try again.'),
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            if (recipe?.recipeId) {
                const token = await getToken();
                return await apiDelete(
                    `recipes/delete/${recipe.recipeId}`,
                    token
                );
            }
        },
        onSuccess: () => Router.push(`/users/${user?.userId}/recipes`),
        onError: () => alert('Failed to delete recipe.'),
    });

    const handleSubmit = async () => {
        if (
            !recipe ||
            !recipe.recipeName ||
            ingredientList.length <= 0 ||
            directionList.length <= 0
        ) {
            return;
        }

        try {
            const uploadedImageUrl = await uploaderRef.current?.handleUpload();

            const updatedRecipe = {
                ...recipe,
                ingredients: ingredientList,
                steps: directionList.map((d) => d.direction),
                imageId: uploadedImageUrl ?? recipe.imageId, // keep previous if no new upload
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
            setDirectionList((prev) => [
                ...prev,
                { id: nanoid(), direction: step.trim() },
            ]);
        }
    };

    const removeStepUpdate = (index: number) => {
        setDirectionList((prev) => prev.filter((_, i) => i !== index));
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

    if (isRecipePending && recipeId)
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
        <div className="max-w-5xl w-full mt-4 mb-10 px-4">
            <div className="">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    {recipeData
                        ? `Edit Recipe: ${recipeData?.recipeName}`
                        : 'Create New Recipe'}
                </h1>
            </div>
            {/** Make the image upload actually work */}
            <div className="flex w-full">
                <section className="flex flex-wrap gap-4 w-full">
                    <div className="w-full flex flex-col gap-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="select-none cursor-default">
                                    Recipe Name
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <RecipeImageUploader
                                    imageContainer={recipe}
                                    setImageContainer={setRecipe}
                                    ref={uploaderRef}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="select-non cursor-default">
                                    Recipe Title
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    id="recipeTitle"
                                    className="placeholder:select-none"
                                    onChange={(e) => {
                                        setRecipe(
                                            (prev) =>
                                                ({
                                                    ...(prev || {}),
                                                    recipeName: e.target.value,
                                                } as Recipe)
                                        );
                                    }}
                                    value={recipe?.recipeName || ''}
                                    placeholder="Recipe Title"
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="select-none cursor-default">
                                    Recipe Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <Textarea
                                    id="recipeDescription"
                                    className="placeholder:select-none"
                                    onChange={(e) => {
                                        setRecipe(
                                            (prev) =>
                                                ({
                                                    ...(prev || {}),
                                                    recipeDescription:
                                                        e.target.value,
                                                } as Recipe)
                                        );
                                    }}
                                    value={recipe?.recipeDescription || ''}
                                    placeholder="Recipe Description"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
            {/* Ingredients Section */}
            <Card className="my-2">
                <CardHeader title="Ingredients">
                    <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-2 items-center">
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
                </CardContent>
            </Card>
            {/* Directions Section */}
            <Card className="my-2">
                <CardHeader title="Directions">
                    <CardTitle>Directions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-2 items-center">
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
                        {directionList.length ? (
                            <DragNDropContext
                                list={directionList}
                                setList={setDirectionList}
                            >
                                <SortableDnDContainer
                                    id="steps"
                                    itemsList={directionList}
                                >
                                    {directionList.map((step, index) => (
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
                                                    {index + 1}.{' '}
                                                    {step.direction}
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
                </CardContent>
            </Card>
            {/* Buttons */}
            <section className="flex gap-2 pb-4">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                        Router.push(`/users/${user?.userId}/recipes`)
                    }
                >
                    Cancel
                </Button>
                <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={recipeMutation.isPending}
                >
                    {recipeMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
                {recipeId && (
                    <Button
                        variant={'outline'}
                        className="w-full"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                )}
            </section>
        </div>
    );
}
