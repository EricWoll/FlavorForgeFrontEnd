import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import { IUserContext } from '@/contexts/user.context';
import { EllipsisVertical } from 'lucide-react';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
    userContext: IUserContext;
}

export function RecipeCard({ recipe, userContext }: RecipeCardProps) {
    return (
        <Card className="w-full max-w-xs shadow-lg hover:shadow-xl transition-shadow z-0 relative">
            <CardHeader>
                <CardTitle>{recipe.recipeName}</CardTitle>
            </CardHeader>
            <CardContent className="z-0">
                <div className="mb-2 w-full h-40 relative overflow-hidden">
                    {recipe.recipeImageId && recipe.recipeImageId !== 'none' ? (
                        <Image
                            src={recipe.recipeImageId}
                            alt={recipe.recipeName}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-600 rounded-md"></div>
                    )}
                </div>

                <section>
                    <div className="flex flex-row gap-2 w-full justify-between">
                        <section className="flex gap-2">
                            <div className="rounded-md h-6 w-6 relative overflow-hidden">
                                {recipe.creatorImageId &&
                                recipe.creatorImageId !== 'none' ? (
                                    <Image
                                        src={recipe.creatorImageId}
                                        alt={recipe.creatorUsername}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-600"></div>
                                )}
                            </div>
                        </section>
                        <section className="flex flex-col w-full">
                            <p>{recipe.recipeName}</p>
                            <p className="text-sm text-wrap">
                                {recipe.creatorUsername}
                            </p>
                            <span className="flex flex-nowrap gap-1 items-center">
                                <HeartTile
                                    recipeId={recipe.recipeId}
                                    isLiked={recipe.liked}
                                    userContext={userContext}
                                />
                                <p>{recipe.likesCount}</p>
                            </span>
                        </section>
                        <section>
                            <EllipsisVertical className="w-6 h-6 text-slate-500" />
                        </section>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}
