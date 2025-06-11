import { RecipeCard } from './RecipeCard';

interface RecipeCardContainerProps {
    recipes: RecipeWithCreator[] | undefined;
}

export function RecipeCardContainer({ recipes }: RecipeCardContainerProps) {
    if (!recipes || recipes.length === 0) {
        return (
            <p className="text-center text-gray-500 select-none cursor-default text-3xl">
                No recipes found.
            </p>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.recipeId} recipe={recipe} />
            ))}
        </div>
    );
}
