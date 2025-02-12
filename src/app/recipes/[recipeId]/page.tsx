interface RecipePageProps {
    params: {
        recipeId: string;
    };
}

export default async function RecipePage({ params }: RecipePageProps) {
    const { recipeId } = await params;

    return (
        <div>
            <h1>Recipe Page</h1>
            <p>{recipeId}</p>
        </div>
    );
}
