import HeartTile from '@/features/tiles/components/heart.tile.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import formatNumber from '@/utils/numberFormatter';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
    isLikeDisabled: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
    return (
        <div className="max-w-[250px] max-h-[395px]">
            <Link href={`/recipes?id=${props.recipe.recipeId}`}>
                <img
                    className="h-[250px] object-cover rounded-md mb-1 select-none"
                    src={props.recipe.recipeImageId}
                />
            </Link>
            <section className="grid">
                <Button.Link href={`/recipes?id=${props.recipe.recipeId}`}>
                    {props.recipe.recipeName}
                </Button.Link>
                <Button.Link
                    href={`/user?id=${props.recipe.creatorId}`}
                    className="text-[.75em]"
                >
                    {props.recipe.creatorUsername}
                </Button.Link>
            </section>
            <p className="text-sm line-clamp-2 my-2 select-none px-1 text-tinted_gray_300">
                {props.recipe.recipeDescription}
            </p>
            <section className="flex justify-between px-1 items-center mb-1">
                <Button.Link href={`/recipes?id=${props.recipe.recipeId}`}>
                    View Recipe
                </Button.Link>
                <div className="flex gap-2 select-none items-center">
                    <p className="text-tinted_gray_300">
                        {formatNumber(props.recipe.likesCount)}{' '}
                    </p>
                    <HeartTile
                        isLiked={props.recipe.isLiked}
                        isDisabled={props.isLikeDisabled}
                    />
                </div>
            </section>
        </div>
    );
}
