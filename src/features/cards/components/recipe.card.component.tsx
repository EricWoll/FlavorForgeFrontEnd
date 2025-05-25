import HeartTile from '@/features/tiles/components/heart.tile.component';
import ImageRequest from '@/lib/my_custom_components/images/requestImage.component';
import formatNumber from '@/utils/numberFormatter';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
    isLikeDisabled: boolean;
    showCreatorIcon?: boolean;
}

export default function RecipeCard({
    showCreatorIcon = true,
    ...props
}: RecipeCardProps) {
    return (
        <div className="w-80 h-56 flex flex-col gap-1">
            <Link
                href={`/recipes?id=${props.recipe.recipeId}`}
                className="flex w-full h-full rounded-10 overflow-hidden bg-tinted_gray_600"
            >
                <ImageRequest filename={props.recipe.recipeImageId} />
            </Link>
            <div className="flex gap-2 flex-row items-center w-full">
                {showCreatorIcon && (
                    <Link
                        href={`/user?id=${props.recipe.creatorId}`}
                        className="rounded-5 bg-tinted_gray_600 h-7 w-8 overflow-hidden"
                    >
                        <ImageRequest
                            filename={props.recipe.creatorImageId}
                            defaultText="N"
                            paddingX_NoImage="2"
                        />
                    </Link>
                )}
                <div className="flex flex-row flex-nowrap w-full">
                    <section className="flex flex-col w-full">
                        <Link
                            href={`/recipes?id=${props.recipe.recipeId}`}
                            className="text-sm font-semibold w-fit h-fit"
                        >
                            {props.recipe.recipeName}
                        </Link>
                        <Link
                            href={`/user?id=${props.recipe.creatorId}`}
                            className="text-xs"
                        >
                            {props.recipe.creatorUsername}
                        </Link>
                    </section>
                    <div className="flex flex-nowrap gap-2 select-none items-center mr-auto ml-0">
                        <p className="text-tinted_gray_300">
                            {formatNumber(props.recipe.likesCount)}{' '}
                        </p>
                        <HeartTile
                            isLiked={props.recipe.liked}
                            isDisabled={props.isLikeDisabled}
                            recipeId={props.recipe.recipeId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
