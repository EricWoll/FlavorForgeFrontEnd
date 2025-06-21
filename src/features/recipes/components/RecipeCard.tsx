import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import { IUserContext } from '@/contexts/user.context';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
    userContext: IUserContext;
}

export function RecipeCard({ recipe, userContext }: RecipeCardProps) {
    return (
        <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition-shadow relative bg-background p-0">
            {/* Video-style Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden rounded-t-md">
                {recipe.recipeImageId && recipe.recipeImageId !== 'none' ? (
                    <Link href={`/recipes/view/${recipe.recipeId}`}>
                        <Image
                            src={recipe.recipeImageId}
                            alt={recipe.recipeName}
                            fill
                            className="object-cover"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full bg-slate-600" />
                )}
            </div>

            {/* Bottom Content (like YouTube details) */}
            <CardContent className="flex gap-3 p-4">
                {/* Creator Avatar */}
                <div className="min-w-10 min-h-10 w-10 h-10 rounded-full overflow-hidden bg-muted relative">
                    {recipe.creatorImageId &&
                    recipe.creatorImageId !== 'none' ? (
                        <Link href={`/users/${recipe.creatorId}`}>
                            <Image
                                src={recipe.creatorImageId}
                                alt={recipe.creatorUsername}
                                fill
                                className="object-cover"
                            />
                        </Link>
                    ) : null}
                </div>

                {/* Info */}
                <div className="flex flex-row justify-between w-full">
                    <section>
                        <Link href={`/recipes/view/${recipe.recipeId}`}>
                            <p className="text-base font-semibold line-clamp-2 leading-tight">
                                {recipe.recipeName}
                            </p>
                        </Link>
                        <Link href={`/users/${recipe.creatorId}`}>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {recipe.creatorUsername}
                            </p>
                        </Link>
                    </section>
                    <div className="flex items-center gap-2 mt-1">
                        <HeartTile
                            recipeId={recipe.recipeId}
                            isLiked={recipe.liked}
                            userContext={userContext}
                        />
                        <p className="text-sm text-muted-foreground">
                            {recipe.likesCount}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
