'use client';

import EditRecipeCard from '@/components/Cards/editRecipe.Card.component';
import { useUserContext } from '@/contexts/User.context';
import { apiGet } from '@/utils/fetchHelpers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyRecipes() {
    const { user, loading } = useUserContext(); // Use updated context with loading state
    const router = useRouter();

    const [recipes, setRecipes] = useState<Array<RecipeCard>>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading || !user || !user.id) return; // Skip API call during loading or if no user

        console.log('user loaded');

        if (!user?.id) {
            router.push('/'); // Redirect if not logged in
        }

        const fetchRecipes = async () => {
            try {
                if (user.id) {
                    const response = await apiGet(`recipes/users/${user.id}`);
                    if (!response.ok) {
                        throw new Error(
                            `Failed to fetch recipes: ${response.statusText}`
                        );
                    }
                    const recipeData = await response.json();
                    setRecipes(recipeData);
                } else {
                    setError('User ID is missing!');
                }
            } catch (error: any) {
                console.error('Error fetching recipes:', error);
                setError('Error loading recipes. Please try again later.');
            }
        };

        fetchRecipes();
    }, [user, loading]);

    if (loading) {
        return <div>Loading your recipes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grow m-2 relative">
            <Link
                className="absolute bottom-5 right-5 bg-gray-600 text-gray-300 p-2 text-2xl rounded-full"
                href="/recipe/edit"
            >
                Add recipes
            </Link>
            <section className="flex flex-wrap gap-4 justify-center">
                {recipes.length > 0 ? (
                    recipes.map((cardInfo) => (
                        <EditRecipeCard
                            key={cardInfo.recipeId}
                            card={cardInfo}
                        />
                    ))
                ) : (
                    <div>No recipes found</div>
                )}
            </section>
        </div>
    );
}
