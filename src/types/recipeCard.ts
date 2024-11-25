interface RecipeCard {
    recipeId: string | null;
    userId: string | undefined;
    recipeName: string;
    recipeDescription: string;
    ingredients: Array<IIngredients>;
    steps: Array<string>;
    imageId: string;
    likesCount: number;
}
