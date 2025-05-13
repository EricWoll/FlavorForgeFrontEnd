import {
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import HeartTile from '@/features/tiles/components/heart.tile.component';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import formatNumber from '@/utils/numberFormatter';
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CirclePlusIcon, DotIcon, Heart } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: RecipeWithCreator;
    isLikeDisabled: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
    return (
        <div className="w-72 h-56">
            <Link href={`/recipes?id=${props.recipe.recipeId}`}>
                <img
                    className="h-40 object-cover rounded-md mb-1 select-none"
                    src={props.recipe.recipeImageId}
                />
            </Link>
            <section className="grid">
                <Button.Link href={`/recipes?id=${props.recipe.recipeId}`}>
                    {props.recipe.recipeName}
                </Button.Link>
                <div className="flex items-center justify-between">
                    <Button.Link
                        href={`/user?id=${props.recipe.creatorId}`}
                        className="text-[.75em]"
                        isCropped
                    >
                        {props.recipe.creatorUsername}
                    </Button.Link>
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button.Hover>
                                    <CirclePlusIcon className="h-4 w-4 text-tinted_gray_400" />
                                </Button.Hover>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="!outline outline-1 !outline-tinted_gray_600 !bg-tinted_gray_700 shadow-gray-sm">
                                <DropdownMenuItem>
                                    <p>text</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>
        </div>
    );
}
