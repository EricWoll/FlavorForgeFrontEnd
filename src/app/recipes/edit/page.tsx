'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserContext } from '@/contexts/User.context';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import { apiGet } from '@/utils/handlerHelpers';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditRecipePage() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');
    const Window = useWindow();

    const UserContext = useUserContext();

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    const [editingIngredient, setEditingIngredient] =
        useState<Ingredients | null>(null);
    const [editingStep, setEditingStep] = useState<string | null>(null);

    const { isPending, error, data } = useQuery<Recipe, Error>({
        queryKey: ['recipe_search', recipeId],
        queryFn: () => apiGet(`recipes/search/${recipeId}`),
        enabled: !!recipeId,
    });

    useEffect(() => {
        if (data) setRecipe(data);
    }, [data]);

    const addStepUpdate = (step: string) => {
        if (step.trim() != '') {
            const newSteps = [...(recipe?.steps || []), step];
            setRecipe((prev: Recipe | null) => {
                return {
                    ...(prev || {}),
                    steps: newSteps,
                } as Recipe;
            });
        }
    };

    const removeStepUpdate = (itemIndex: number) => {
        if (recipe?.steps.length != 0) {
            setRecipe((prev: Recipe | null) => {
                return {
                    ...(prev || {}),
                    steps: prev?.steps.filter(
                        (item, index) => index != itemIndex
                    ),
                } as Recipe;
            });
        }
    };

    const addIngredientUpdate = (ingredient: Ingredients) => {
        if (
            ingredient.amount &&
            ingredient.ingredientName &&
            ingredient.ingredientName != ''
        ) {
            const newIngredients = [...(recipe?.ingredients || []), ingredient];
            setRecipe((prev: Recipe | null) => {
                return {
                    ...(prev || {}),
                    ingredients: newIngredients,
                } as Recipe;
            });
        }
    };

    const removeIngredientUpdate = (itemIndex: number) => {
        if (recipe?.ingredients.length != 0) {
            setRecipe((prev: Recipe | null) => {
                return {
                    ...(prev || {}),
                    ingredients: recipe?.ingredients.filter(
                        (item, index) => index != itemIndex
                    ),
                } as Recipe;
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
            <section className={`flex flex-wrap gap-2 mb-4 justify-center`}>
                <img
                    src={recipe?.recipeImageId}
                    className="h-[250px] w-[250px] object-cover rounded-lg"
                />
                <div>
                    <h1
                        className={`text-4xl ${
                            Window.windowSize.match(WindowSizes.SMALL) &&
                            'text-center'
                        }`}
                    >
                        {recipe?.recipeName}
                    </h1>
                    <p className="my-2">{recipe?.recipeDescription}</p>
                </div>
            </section>
            <section className="">
                <div className="flex gap-4 mb-2 items-center">
                    <h2 className="text-2xl">Ingredients</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button.Hover isOutlined>Add</Button.Hover>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Ingredient</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={
                                            editingIngredient?.ingredientName ||
                                            ''
                                        }
                                        className="col-span-3"
                                        placeholder="sugar"
                                        onChange={(e) => {
                                            setEditingIngredient((prev) => {
                                                return {
                                                    ...prev,
                                                    ingredientName:
                                                        e.target.value,
                                                } as Ingredients;
                                            });
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="amount"
                                        className="text-right"
                                    >
                                        Amount
                                    </Label>
                                    <Input
                                        id="amount"
                                        value={editingIngredient?.amount || ''}
                                        className="col-span-3"
                                        placeholder="1/2 tsb"
                                        onChange={(e) => {
                                            setEditingIngredient((prev) => {
                                                return {
                                                    ...prev,
                                                    amount: e.target.value,
                                                } as Ingredients;
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button.Hover
                                        onClick={() => {
                                            if (editingIngredient) {
                                                addIngredientUpdate(
                                                    editingIngredient
                                                );
                                                setEditingIngredient(null);
                                            }
                                        }}
                                    >
                                        Add Amount
                                    </Button.Hover>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                    {recipe?.ingredients && recipe.ingredients.length != 0 ? (
                        recipe?.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <section className="flex justify-between">
                                    <p>
                                        {ingredient.amount} |{' '}
                                        {ingredient.ingredientName}
                                    </p>
                                    <p
                                        className="text-red-500 hover:cursor-pointer select-none"
                                        onClick={() =>
                                            removeIngredientUpdate(index)
                                        }
                                    >
                                        X
                                    </p>
                                </section>
                                {recipe.ingredients.length > index + 1 && (
                                    <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-tinted_gray_600 cursor-default select-none">
                            No Ingredients for your recipe!
                        </p>
                    )}
                </div>
            </section>
            <section className="my-4">
                <div className="flex gap-4 mb-2 items-center">
                    <h2 className="text-2xl">Directions</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button.Hover isOutlined>Add</Button.Hover>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Direction</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Direction
                                    </Label>
                                    <Input
                                        id="name"
                                        value={editingStep ? editingStep : ''}
                                        className="col-span-3"
                                        placeholder="sugar"
                                        onChange={(e) => {
                                            setEditingStep(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button.Hover
                                        onClick={() => {
                                            if (editingStep) {
                                                addStepUpdate(editingStep);
                                                setEditingStep(null);
                                            }
                                        }}
                                    >
                                        Add Direction
                                    </Button.Hover>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="shadow-popin_tinted_gray p-2 rounded-lg">
                    {recipe?.steps && recipe.steps.length != 0 ? (
                        recipe?.steps.map((step, index) => (
                            <div key={index}>
                                <section className="flex justify-between">
                                    <p>
                                        {index + 1}. {step}
                                    </p>

                                    <p
                                        className="text-red-500 hover:cursor-pointer select-none"
                                        onClick={() => removeStepUpdate(index)}
                                    >
                                        X
                                    </p>
                                </section>
                                {recipe.steps.length > index + 1 && (
                                    <hr className="my-1 bg-tinted_gray_600 h-1 rounded-full" />
                                )}
                            </div>
                        ))
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
