import { useState } from "react";
import { Recipe } from "../types/recipe";

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const addIngredient = (ingredient: string) => {
        setIngredients((ingredients) => [...ingredients, ingredient])
    }

    const generateRecipes = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients }),
        });

        const data = await response.json();

        setRecipes(data);
        } catch {
            setError('Failed to generate recipes');
        } finally {
            setIsLoading(false);
        }
    }

    return {
        recipes,
        ingredients,
        isLoading,
        error,
        generateRecipes,
        addIngredient
    }
}