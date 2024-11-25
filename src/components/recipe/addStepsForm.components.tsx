'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import FormButton from '../FormElements/button.Form.component';
import { FormInput } from '../FormElements/input.Form.Component';

export default function AddStepsForm({
    recipe,
    setRecipe,
}: {
    recipe: RecipeCard;
    setRecipe: Dispatch<SetStateAction<RecipeCard>>;
}) {
    const [step, setStep] = useState<string>('');

    const handleAddStep = () => {
        if (step != null && step != '') {
            setRecipe({ ...recipe, steps: [...recipe.steps, step] });
            setStep('');
        }
    };

    return (
        <div className="flex flex-wrap">
            <FormButton
                buttonText="Add Step"
                onClick={handleAddStep}
                wFull={false}
            />
            <FormInput
                label=""
                type="text"
                placeholder="Beat the eggs"
                wFull={false}
                value={step}
                onChange={(event) => {
                    setStep(event.target.value);
                }}
            />
        </div>
    );
}
