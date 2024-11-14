interface RecipeCard {
    recipeId: string;
    userId: string;
    recipeName: string;
    recipeDescription: string;
    ingredients: Array<Object>;
    steps: Array<String>;
    imageId: string;
    likesCount: number;
}
