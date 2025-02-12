type Recipe = {
    creatorId: string;
    creatorName: string;
    creatorIcon: string;
    recipeId: string;
    recipeName: string;
    recipeImage: string;
    recipeDescription: string;
    recipeIngredients: Array<{
        name: string;
        amount: string;
    }>;
    recipeSteps: Array<string>;
    recipeLikes: number;
    recipeCreatedDate: string;
    userLikedRecipe: boolean;
};
