import ImageRequest from '@/features/images/components/requestImage.component';
import formatNumber from '@/utils/numberFormatter';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
    isLikeDisabled: boolean;
    isLoggedIn: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
    return (
        <div className="w-72 h-56 flex flex-col gap-2">
            <Link
                href={`/recipes?id=${props.recipe.recipeId}`}
                className="flex w-full h-full rounded-10 overflow-hidden"
            >
                <ImageRequest filename={props.recipe.recipeImageId} />
            </Link>
            <section className="grid px-1">
                <Link href={`/recipes?id=${props.recipe.recipeId}`}>
                    {props.recipe.recipeName}
                </Link>
                <div className="flex items-center justify-between">
                    <Link
                        href={`/user?id=${props.recipe.creatorId}`}
                        className="text-[.75em] flex gap-2"
                    >
                        <span className={`rounded-full overflow-hidden`}>
                            <ImageRequest
                                filename={props.recipe.creatorImageId}
                                defaultText="N"
                                paddingX_NoImage="2"
                            />
                        </span>
                        {props.recipe.creatorUsername}
                    </Link>
                    <div className="flex flex-nowrap gap-2 select-none items-center">
                        <div className="flex flex-nowrap gap-2 select-none items-center">
                            <p className="text-tinted_gray_300">
                                {formatNumber(props.recipe.likesCount)}{' '}
                            </p>
                            <Heart
                                className="h-4 w-4 text-tinted_gray_500"
                                fill="#939EA7"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
