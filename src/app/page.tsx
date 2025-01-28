'use client';

import RecipeCardsContainer from '@/components/cards/recipeContainer.cards.component';
import {
    findRandomRecipe,
    findSearchedRecipes,
} from '@/utils/FetchHelpers/recipes.FetchHelpers';
import { apiGet } from '@/utils/handlerHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const dummyCardInfo = [
    {
        creatorId: '321123adsfadsefsda',
        creatorName: 'Willow Hearthstone',
        creatorIcon:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeId: '321123adsfadsefsda',
        recipeName: 'Enchanted Forest Berry Tart',
        recipeImage:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeDescription:
            'Step into a magical world of flavor with this Enchanted Forest Berry Tart. This delightful dessert features a flaky, golden crust filled with a luscious vanilla bean custard, topped with a vibrant medley of fresh berries—blueberries, raspberries, and blackberries. A hint of lemon zest and a drizzle of honey add an enchanting touch of sweetness. Perfect for gatherings or an afternoon treat, this tart is as beautiful as it is delicious. Serve chilled and let the magic of the forest come alive in every bite!',
        recipeLikes: 12652147,
        recipeCreatedDate: '2017-06-15T10:25:00Z',
        userLikedRecipe: false,
    },
    {
        creatorId: '321123adsfadsefsda',
        creatorName: 'Willow Hearthstone',
        creatorIcon:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeId: '321123adsfadsefssda',
        recipeName: 'Enchanted Forest Berry Tart',
        recipeImage:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeDescription:
            'Step into a magical world of flavor with this Enchanted Forest Berry Tart. This delightful dessert features a flaky, golden crust filled with a luscious vanilla bean custard, topped with a vibrant medley of fresh berries—blueberries, raspberries, and blackberries. A hint of lemon zest and a drizzle of honey add an enchanting touch of sweetness. Perfect for gatherings or an afternoon treat, this tart is as beautiful as it is delicious. Serve chilled and let the magic of the forest come alive in every bite!',
        recipeLikes: 12652147,
        recipeCreatedDate: '2017-06-15T10:25:00Z',
        userLikedRecipe: false,
    },
    {
        creatorId: '321123adsfadsefsda',
        creatorName: 'Willow Hearthstone',
        creatorIcon:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeId: '321123adsfadsefsdsa',
        recipeName: 'Enchanted Forest Berry Tart',
        recipeImage:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeDescription:
            'Step into a magical world of flavor with this Enchanted Forest Berry Tart. This delightful dessert features a flaky, golden crust filled with a luscious vanilla bean custard, topped with a vibrant medley of fresh berries—blueberries, raspberries, and blackberries. A hint of lemon zest and a drizzle of honey add an enchanting touch of sweetness. Perfect for gatherings or an afternoon treat, this tart is as beautiful as it is delicious. Serve chilled and let the magic of the forest come alive in every bite!',
        recipeLikes: 12652147,
        recipeCreatedDate: '2017-06-15T10:25:00Z',
        userLikedRecipe: false,
    },
    {
        creatorId: '321123adsfadsefsda',
        creatorName: 'Willow Hearthstone',
        creatorIcon:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeId: '321s123adsfadsefsdsa',
        recipeName: 'Enchanted Forest Berry Tart',
        recipeImage:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeDescription:
            'Step into a magical world of flavor with this Enchanted Forest Berry Tart. This delightful dessert features a flaky, golden crust filled with a luscious vanilla bean custard, topped with a vibrant medley of fresh berries—blueberries, raspberries, and blackberries. A hint of lemon zest and a drizzle of honey add an enchanting touch of sweetness. Perfect for gatherings or an afternoon treat, this tart is as beautiful as it is delicious. Serve chilled and let the magic of the forest come alive in every bite!',
        recipeLikes: 12652147,
        recipeCreatedDate: '2017-06-15T10:25:00Z',
        userLikedRecipe: false,
    },
    {
        creatorId: '321123adsfadsefsda',
        creatorName: 'Willow Hearthstone',
        creatorIcon:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeId: '321s123adsfadsefsdssa',
        recipeName: 'Enchanted Forest Berry Tart',
        recipeImage:
            'https://dummyjson.com/image/1920x1080/CA2C3F?text=Dummy+Image',
        recipeDescription:
            'Step into a magical world of flavor with this Enchanted Forest Berry Tart. This delightful dessert features a flaky, golden crust filled with a luscious vanilla bean custard, topped with a vibrant medley of fresh berries—blueberries, raspberries, and blackberries. A hint of lemon zest and a drizzle of honey add an enchanting touch of sweetness. Perfect for gatherings or an afternoon treat, this tart is as beautiful as it is delicious. Serve chilled and let the magic of the forest come alive in every bite!',
        recipeLikes: 12652147,
        recipeCreatedDate: '2017-06-15T10:25:00Z',
        userLikedRecipe: false,
    },
];

export default function Home() {
    const Search = useSearchParams();

    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [searchParam, setSearchParam] = useState<string>(
        Search.get('search') || ''
    );
    const [noSearch, setNoSearch] = useState<boolean>(false);
    const [pageLoading, setPageLoading] = useState<boolean>(false); // Remember to change back to true!!!
    const [error, setError] = useState<string | null>(null);

    if (pageLoading) {
        return <div className="w-full">Loading Recipe...</div>;
    }

    if (error) {
        return <div className="error-message w-full">{error}</div>;
    }

    return (
        <div className="grow w-full">
            <RecipeCardsContainer listOfRecipes={dummyCardInfo} />
        </div>
    );
}
