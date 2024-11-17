interface RecipeCard {
    recipeId: string;
    userId: string;
    recipeName: string;
    recipeDescription: string;
    ingredients: Array<object>;
    steps: Array<string>;
    imageId: string;
    likesCount: number;
}
