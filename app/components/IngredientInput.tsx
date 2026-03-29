'use client';
import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';

export default function IngredientInput() {
  const { ingredients, addIngredient } = useRecipes();
  const [userInput, setUserInput] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder='Add ingredients'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        onClick={() => {
          addIngredient(userInput);
          setUserInput('');
        }}
      >
        Add Ingredient
      </button>

      {ingredients.map((ingredient) => (
        <div key={ingredient}>
          <p>{ingredient}</p>
          <button>X</button>
        </div>
      ))}
    </div>
  );
}
