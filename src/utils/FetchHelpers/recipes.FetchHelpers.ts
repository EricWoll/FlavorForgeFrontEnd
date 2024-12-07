import { apiDelete, apiGet, apiPost, apiPut } from '../handlerHelpers';

export async function findRandomRecipe() {
    const res = await apiGet('search/recipes', 'pageAmount=10');
    if (!res.ok) {
        throw new Error('Failed to fetch recipes.');
    }
    return await res.json();
}

export async function findSearchedRecipes(searchParam: string) {
    const res = await apiGet(`search/recipes/${searchParam}`, 'pageAmount=10');
    if (!res.ok) {
        throw new Error('Failed to fetch recipes.');
    }
    return await res.json();
}

export async function findRecipe(recipeId: string) {
    const response = await apiGet(`recipes/${recipeId}`);
    if (!response.ok) {
        throw new Error(`Failed fetching User: ${response.statusText}`);
    }
    return await response.json();
}

export async function findRecipesWithUser(
    user: IUserContextPublic | null,
    recipeId: string
) {
    if (user) {
        const res = await getRecipes(user, recipeId);

        if (!res.ok) {
            throw new Error(`Failed to fecth recipe: ${res.statusText}`);
        }
        return await res.json();
    }
}

async function getRecipes(user: IUserContextPublic | null, recipeId: string) {
    if (user) {
        return await apiGet(
            `recipes/followed/${recipeId}`,
            `user_id=${user.id}`,
            user.token
        );
    } else {
        return await apiGet(`recipes/${recipeId}`);
    }
}

export async function findRecipesByUser(userId: string | null) {
    if (!userId) throw new Error('No UserId!');

    const response = await apiGet(`recipes/users/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }
    return await response.json();
}

export async function updateRecipe(
    recipeId: string,
    updatedRecipe: RecipeCard,
    token: string | undefined
) {
    if (token) {
        await apiPut(`recipes/${recipeId}`, updatedRecipe, token);
    } else {
        throw new Error('Missing Token!');
    }
}

export async function addRecipe(
    updatedRecipe: RecipeCard,
    token: string | undefined
) {
    if (token) {
        await apiPost('recipes', updatedRecipe, token);
    } else {
        throw new Error('Missing Token!');
    }
}

export async function deleteRecipe(
    recipeId: string,
    token: string | undefined
) {
    if (token) {
        await apiDelete(`recipes/${recipeId}`, token);
    } else {
        throw new Error('Missing Token!');
    }
}
