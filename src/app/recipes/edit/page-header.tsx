'user client';

import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import Input from '@/lib/my_custom_components/inputs/input.Form.component';

export default function EditRecipePageHeader({
    recipe,
    setRecipe,
    inputRef,
    file,
    setFile,
}: {
    recipe: Recipe | null;
    setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
    inputRef: React.RefObject<HTMLInputElement>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0] || null);
        } else {
            alert('There was an error adding file to recipe.');
        }
    };

    return (
        <div className="flex w-full">
            <section className="flex flex-wrap gap-4 w-full">
                <div className="flex flex-col gap-1">
                    {recipe != undefined &&
                    recipe?.recipeImageId != 'none' &&
                    !file ? (
                        <div className="w-64 h-64 bg-tinted_gray_600 rounded-5 overflow-hidden">
                            <ImageRequest filename={recipe.recipeImageId} />
                        </div>
                    ) : (
                        <>
                            {file ? (
                                <img
                                    className="h-64"
                                    src={URL.createObjectURL(file)}
                                />
                            ) : (
                                <div className="w-64 h-64 rounded-5 bg-tinted_gray_600"></div>
                            )}
                        </>
                    )}
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
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
