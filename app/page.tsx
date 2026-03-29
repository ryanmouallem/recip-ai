'use client'

import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import { useRecipes } from './hooks/useRecipes';

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

      <IngredientInput ingredients={ingredients} addIngredient={addIngredient}/>
      <RecipeList recipes={recipes} />

      <button
        onClick={generateRecipes}
      >Generate Recipes</button>
    </div>
  );
}
