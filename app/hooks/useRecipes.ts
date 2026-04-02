import { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem('recipai_recipes');
      return stored ? (JSON.parse(stored) as Recipe[]) : [];
    } catch {
      return [];
    }
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('recipai_recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addIngredient = (ingredient: string) => {
    setIngredients((ingredients) => [...ingredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((ingredient) => ingredient.filter((_, i) => i !== index));
  }

  const generateRecipes = async () => {
    setError('');

    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        setError('Failed to generate recipes');
      }
    } catch {
      setError('Failed to generate recipes');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recipes,
    ingredients,
    isLoading,
    error,
    generateRecipes,
    addIngredient,
    removeIngredient
  };
}
