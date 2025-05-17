'user client';

import Input from '@/lib/my_custom_components/inputs/input.Form.component';

export default function EditRecipePageHeader({
    recipe,
    setRecipe,
    inputRef,
}: {
    recipe: Recipe | null;
    setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
    inputRef: React.RefObject<HTMLInputElement>;
}) {
    return (
        <div className="flex justify-center w-full px-4">
            <section className="flex flex-nowrap gap-4 w-full max-w-5xl">
                <img
                    src={recipe?.recipeImageId}
                    className="h-[250px] w-[250px] object-cover rounded-lg"
                />
                <div className="w-full flex flex-col gap-2">
                    <Input
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
                        ref={inputRef}
                        size="full"
                        paddingX="none"
                        paddingY="none"
                        borderColor="border-tinted_gray_500"
                    />
                    <Input
                        resize="y"
                        isTextArea
                        onChange={(e) => {
                            setRecipe(
                                (prev) =>
                                    ({
                                        ...(prev || {}),
                                        recipeDescription: e.target.value,
                                    } as Recipe)
                            );
                        }}
                        value={recipe?.recipeDescription || ''}
                        ref={inputRef}
                        size="full"
                        paddingX="none"
                        paddingY="none"
                        borderColor="border-tinted_gray_500"
                    />
                </div>
            </section>
        </div>
    );
}
