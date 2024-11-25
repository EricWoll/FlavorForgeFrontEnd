'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormInput } from '../FormElements/input.Form.Component';

export default function AddIngredientsForm({
    recipe,
    setRecipe,
}: {
    recipe: RecipeCard;
    setRecipe: Dispatch<SetStateAction<RecipeCard>>;
}) {
    const [ingredient, setIngredient] = useState<IIngredients>({
        name: '',
        amount: '',
    });

    const handleAddIngredient = () => {
        if (ingredient.amount != '' && ingredient.name != '') {
            setRecipe({
                ...recipe,
                ingredients: [...recipe.ingredients, ingredient],
            });
            setIngredient({ name: '', amount: '' });
        }
    };

    return (
        <div className="flex flex-wrap">
            <FormButton
                buttonText="Add Ingredient"
                onClick={handleAddIngredient}
                wFull={false}
            />
            <FormInput
                label="Amount"
                type="text"
                placeholder="1/2 tsp"
                wFull={false}
                value={ingredient.amount}
                onChange={(event) => {
                    setIngredient({
                        name: ingredient.name,
                        amount: event.target.value,
                    });
                }}
            />
            <FormInput
                label="Name"
                type="text"
                placeholder="Olive Oil"
                wFull={false}
                value={ingredient.name}
                onChange={(event) => {
                    setIngredient({
                        name: event.target.value,
                        amount: ingredient.amount,
                    });
                }}
            />
        </div>
    );
}
