import { useState, useEffect } from 'react';
import { SavedRecipe } from '../types/recipe';

export function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setSavedRecipes(data as SavedRecipe[]);
        } else {
          setError('Failed to load saved recipes');
        }
      })
      .catch(() => setError('Failed to load saved recipes'))
      .finally(() => setIsLoading(false));
  }, []);

  const removeRecipe = async (savedId: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.savedId !== savedId));
    await fetch(`/api/recipes/${savedId}`, { method: 'DELETE' });
  };

  return { savedRecipes, isLoading, error, removeRecipe };
}
