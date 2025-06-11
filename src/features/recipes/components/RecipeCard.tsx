import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Card className="w-full max-w-xs shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle>{recipe.recipeName}</CardTitle>
            </CardHeader>
            <CardContent>
                {recipe.recipeImageId && (
                    <div className="mb-2">
                        <Image
                            src={recipe.recipeImageId}
                            alt={recipe.recipeName}
                            width={320}
                            height={180}
                            className="rounded-md object-cover w-full h-40"
                        />
                    </div>
                )}

                <p className="text-sm text-muted-foreground line-clamp-3">
                    {recipe.recipeDescription}
                </p>
            </CardContent>
        </Card>
    );
}
