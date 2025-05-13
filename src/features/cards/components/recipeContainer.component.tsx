'use client';

import { useUserContext } from '@/contexts/User.context';
import RecipeCard from './recipe.card.component';

interface RecipeContainerProps {
    recipeList: Array<RecipeWithCreator> | null;
}

export default function RecipeContainer(props: RecipeContainerProps) {
    const userContext = useUserContext();

    if (!props.recipeList) {
        return <div>No recipes found.</div>;
    }

    return (
        <div className={`flex gap-4 flex-wrap justify-center`}>
            {props.recipeList?.map((recipe: RecipeWithCreator) => (
                <RecipeCard
                    key={recipe.recipeId}
                    recipe={recipe}
                    isLikeDisabled={
                        userContext.loading &&
                        userContext.user?.id == recipe.creatorId
                    }
                    isLoggedIn={userContext.user?.id ? true : false}
                />
            ))}
        </div>
    );
}
