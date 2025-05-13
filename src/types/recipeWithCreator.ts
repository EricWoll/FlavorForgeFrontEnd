type RecipeWithCreator = {
    recipeId: string;
    creatorId: string;
    creatorImageId: string;
    creatorUsername: string;
    recipeName: string;
    recipeImageId: string;
    recipeDescription: string;
    ingredients: Array<Ingredients>;
    steps: Array<string>;
    likesCount: number;
    viewsCount: number;
    isLiked: boolean;
};
