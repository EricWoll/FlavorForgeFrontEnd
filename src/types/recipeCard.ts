interface RecipeCard {
    recipeId: string | null;
    creatorId: string;
    recipeName: string;
    recipeDescription: string;
    ingredients: Array<IIngredients>;
    steps: Array<string>;
    imageId: string;
    likesCount: number;
    creatorUsername: string;
    following?: boolean;
    creator?: string | undefined;
}
