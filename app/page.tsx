'use client';

import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import { useRecipes } from './hooks/useRecipes';
import { Loader2 } from 'lucide-react';

export default function App() {
  const {
    ingredients,
    addIngredient,
    recipes,
    generateRecipes,
    removeIngredient,
    isLoading,
    error,
  } = useRecipes();

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <h1 className="font-bold text-6xl tracking-tight mb-1">
          Recip<span className="text-amber-400">AI</span>
        </h1>
        <h2 className="text-zinc-500 mb-6">
          Add your ingredients and we'll generate recipes for you.
        </h2>

        {isLoading && <Loader2 className="animate-spin" />}
        {error && <p>{error}</p>}

        <IngredientInput
          ingredients={ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />

        <button
          onClick={generateRecipes}
          className="w-full bg-amber-400 hover:bg-amber-500 py-3 px-6 rounded-lg text-zinc-900 text-sm font-semibold mt-4 transition-colors cursor-pointer mb-6"
        >
          Generate Recipes
        </button>

        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}
