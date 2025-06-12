'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useWindow, { WindowSizes } from '@/hooks/useWindow.hook';
import Dropzone from '@/lib/my_custom_components/files/components/dropzone.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';

interface RecipeHeaderPageProps {
    recipe: Recipe | null;
    setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function RecipeHeaderPage({
    recipe,
    setRecipe,
    file,
    setFile,
}: RecipeHeaderPageProps) {
    const Window = useWindow();
    // Function to handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0] || null);
        } else {
            alert('There was an error adding file to recipe.');
        }
    };

    const isSmallScreen = Window.windowSize.match(WindowSizes.SMALL); // Adjust the breakpoint as needed

    return (
        <div className="flex w-full">
            <section className="flex flex-wrap gap-4 w-full">
                <div className="flex flex-col gap-1 grow">
                    {recipe?.recipeImageId != undefined &&
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
                            ) : isSmallScreen ? (
                                <div className="w-full h-64 rounded-5 bg-transparent border-primary border-dashed border-2 flex items-center justify-center">
                                    <p className="text-2xl text-primary/50">
                                        No image
                                    </p>
                                </div>
                            ) : (
                                <Dropzone file={file} onFileChange={setFile} />
                            )}
                        </>
                    )}
                    {isSmallScreen && (
                        <div className="w-full flex justify-center">
                            <input
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="select-none cursor-default">
                                Recipe Name
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <Input
                                id="recipeName"
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
                                placeholder="Recipe Name"
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
    );
}
