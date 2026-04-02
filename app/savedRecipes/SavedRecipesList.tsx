'use client';
import { Loader2 } from 'lucide-react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';
import RecipeList from '../components/RecipeList';

export default function SavedRecipesList() {
  const { savedRecipes, isLoading, error, removeRecipe } = useSavedRecipes();

  if (isLoading) {
    return <Loader2 className="animate-spin text-zinc-400" />;
  }

  if (error) {
    return <p className="text-red-400 text-sm">{error}</p>;
  }

  if (savedRecipes.length === 0) {
    return (
      <p className="text-zinc-600 text-sm text-center py-10">
        No saved recipes yet. Generate some and hit Save!
      </p>
    );
  }

  return (
    <RecipeList mode="remove" recipes={savedRecipes} onRemove={removeRecipe} />
  );
}
