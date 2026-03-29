'use client';
import { useState } from 'react';
import { Trash } from 'lucide-react';

type IngredientProps = {
    ingredients: string[];
    addIngredient: (ingredient: string) => void;
}

export default function IngredientInput({ ingredients, addIngredient }: IngredientProps ) {
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
          <button><Trash className='w-6 h-6'/></button>
        </div>
      ))}
    </div>
  );
}
