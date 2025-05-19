'use client';

import { useUserContext } from '@/contexts/User.context';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiGet } from '@/utils/handlerHelpers';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import EditRecipePageHeader from './page-header';
import { DirectionsDialog, IngredientsDialog } from './page-dialogs';
import DragNDropContext from '@/lib/my_custom_components/dragNdrop/context.dragNdrop.component';
import SortableDnDContainer from '@/lib/my_custom_components/dragNdrop/sortableContainer.dragNdrop.component';
import { nanoid } from 'nanoid';
import SortableItemDnD from '@/lib/my_custom_components/dragNdrop/sortableItem.dragNdrop.component';
import { GripVerticalIcon, X } from 'lucide-react';

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

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    // holds all confirmed ingredients/steps user has added
    const [ingredientList, setIngredientList] = useState<IngredientWithId[]>(
        []
    );
    const [directionsList, setDirectionsList] = useState<DirectionItem[]>([]);

    // holds current possible ingredient/step user is adding
    const [editingIngredient, setEditingIngredient] =
        useState<Ingredients | null>(null);
    const [editingStep, setEditingStep] = useState<string | null>(null);

    const [file, setFile] = useState<File | null>(null);

    // UUID for if new recipe
    const newUUID = crypto.randomUUID();

    const inputRef = useRef<HTMLInputElement>(null);

    const { isPending, error, data } = useQuery<Recipe, Error>({
        queryKey: ['recipe_search', recipeId],
        queryFn: () => apiGet(`recipes/search/${recipeId}`),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!recipeId,
    });

    useEffect(() => {
        if (data) {
            setRecipe(data);

            setIngredientList((prevList) => {
                if (!prevList || prevList.length !== data.ingredients.length) {
                    return data.ingredients.map((item) => ({
                        ...item,
                        id: nanoid(),
                    }));
                }
                return prevList;
            });

            setDirectionsList((prevList) => {
                if (!prevList || prevList.length !== data.steps.length) {
                    return data.steps.map((item) => ({
                        direction: item,
                        id: nanoid(),
                    }));
                }
                return prevList;
            });
        }
    }, [data]);

    const addStepUpdate = (step: string) => {
        if (step.trim() != '') {
            setDirectionsList((prev) => {
                return [
                    ...(prev || []),
                    {
                        id: nanoid(),
                        direction: step.trim(),
                    },
                ];
            });
        }
    };

    const removeStepUpdate = (itemIndex: number) => {
        if (recipe?.steps.length != 0) {
            setDirectionsList((prev) => {
                return [...(prev || [])].filter(
                    (item, index) => index != itemIndex
                );
            });
        }
    };

    const addIngredientUpdate = (ingredient: Ingredients) => {
        if (
            ingredient.amount &&
            ingredient.ingredientName &&
            ingredient.ingredientName != ''
        ) {
            setIngredientList((prev) => {
                return [
                    ...(prev || []),
                    {
                        id: crypto.randomUUID(), // or nanoid()
                        ...ingredient,
                    },
                ];
            });
        }
    };

    const removeIngredientUpdate = (itemIndex: number) => {
        if (recipe?.ingredients.length != 0) {
            setIngredientList((prev) => {
                return [...(prev || [])].filter(
                    (item, index) => index != itemIndex
                );
            });
        }
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
        <div className="mx-4 w-full">
            <EditRecipePageHeader
                recipe={recipe}
                setRecipe={setRecipe}
                inputRef={inputRef}
                file={file}
                setFile={setFile}
            />

            <section className="">
                <div className="flex gap-4 mb-2 items-center select-none">
                    <h2 className="text-2xl cursor-default">Ingredients</h2>
                    <IngredientsDialog
                        nameValue={editingIngredient?.ingredientName || ''}
                        nameOnChange={(e) => {
                            setEditingIngredient((prev) => {
                                return {
                                    ...prev,
                                    ingredientName: e.target.value,
                                } as Ingredients;
                            });
                        }}
                        amountValue={editingIngredient?.amount || ''}
                        amountOnChange={(e) => {
                            setEditingIngredient((prev) => {
                                return {
                                    ...prev,
                                    amount: e.target.value,
                                } as Ingredients;
                            });
                        }}
                        dialogCloseOnClick={() => {
                            if (editingIngredient) {
                                addIngredientUpdate(editingIngredient);
                                setEditingIngredient(null);
                            }
                        }}
                    />
                </div>
                <div className="shadow-inset-gray-sm p-2 rounded-lg">
                    {ingredientList && ingredientList.length != 0 ? (
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
                                        moveDirection="y"
                                        key={ingredient.id}
                                        id={ingredient.id}
                                        sortableHandle={
                                            <GripVerticalIcon
                                                className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                                stroke="currentColor"
                                            />
                                        }
                                        bg="bg-tinted_gray_700"
                                        boxShadow="shadow-gray-sm"
                                        marginX="none"
                                    >
                                        <section className="flex justify-between items-center w-full">
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
                                        </section>
                                    </SortableItemDnD>
                                ))}
                            </SortableDnDContainer>
                        </DragNDropContext>
                    ) : (
                        <p className="text-tinted_gray_600 cursor-default select-none">
                            No Ingredients for your recipe!
                        </p>
                    )}
                </div>
            </section>
            <section className="my-4">
                <div className="flex gap-4 mb-2 items-center select-none">
                    <h2 className="text-2xl cursor-default">Directions</h2>
                    <DirectionsDialog
                        directionValue={editingStep ? editingStep : ''}
                        directionOnChange={(e) => {
                            setEditingStep(e.target.value);
                        }}
                        dialogCloseOnClick={() => {
                            if (editingStep) {
                                addStepUpdate(editingStep);
                                setEditingStep(null);
                            }
                        }}
                    />
                </div>
                <div className="shadow-inset-gray-sm p-2 rounded-lg">
                    {directionsList && directionsList.length != 0 ? (
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
                                        moveDirection="y"
                                        id={step.id}
                                        sortableHandle={
                                            <GripVerticalIcon
                                                className="w-6 h-6 text-tinted_gray_300 stroke-current"
                                                stroke="currentColor"
                                            />
                                        }
                                        bg="bg-tinted_gray_700"
                                        marginX="none"
                                        boxShadow="shadow-gray-sm"
                                    >
                                        <section className="flex justify-between items-center w-full">
                                            <p>
                                                <span className="select-none cursor-default">
                                                    {index + 1}.
                                                </span>{' '}
                                                {step.direction}
                                            </p>

                                            <X
                                                className="w-4 h-4 text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    removeStepUpdate(index)
                                                }
                                            />
                                        </section>
                                    </SortableItemDnD>
                                ))}
                            </SortableDnDContainer>
                        </DragNDropContext>
                    ) : (
                        <p className="text-tinted_gray_600 cursor-default select-none">
                            No Directions for your recipe!
                        </p>
                    )}
                </div>
            </section>
            <section className="flex gap-2">
                <Button.Hover
                    isOutlined
                    className="text-red-400 w-full"
                    onClick={() => {}}
                >
                    Cancel
                </Button.Hover>
                <Button.Hover isOutlined className="w-full" onClick={() => {}}>
                    Save
                </Button.Hover>
            </section>
        </div>
    );
}
