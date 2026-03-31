'use client'

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
    isLoading,
    error,
  } = useRecipes();

  return (
    <div>
      <h1>RecipAI</h1>

      {isLoading && <Loader2 className='animate-spin'/>}
      {error && <p>{error}</p>}

      <IngredientInput ingredients={ingredients} addIngredient={addIngredient}/>
      <RecipeList recipes={recipes} />

      <button
        onClick={generateRecipes}
      >Generate Recipes</button>
    </div>
  );
}
