'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

type IngredientProps = {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (index: number) => void;
};

export default function IngredientInput({
  ingredients,
  addIngredient,
  removeIngredient,
}: IngredientProps) {
  const [userInput, setUserInput] = useState('');

  return (
    <div className='w-full py-2'>
        <h2 className='text-xs tracking-widest font-medium mb-2 block text-zinc-500'>INGREDIENTS</h2>
      <div className='flex gap-2 mb-4'>
          <input
            type="text"
            placeholder="e.g. chicken, garlic..."
            value={userInput}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(value)) {
                setUserInput(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const trimmedInput = userInput.trim();
                if (!trimmedInput) return;
                addIngredient(trimmedInput);
                setUserInput('');
              }
            }}
            className='flex-1 bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition-colors'
          />
          <button
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded-lg py-2 px-4 cursor-pointer transition-colors"
            onClick={() => {
              const trimmedInput = userInput.trim();
              if (!trimmedInput) return;
              addIngredient(trimmedInput);
              setUserInput('');
            }}
          >
            + Add
          </button>
      </div>

      <div className='flex flex-col gap-2'>
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 flex items-center justify-between text-sm text-zinc-100"
            >
              <span>{ingredient}</span>
              <button onClick={() => removeIngredient(index)}>
                <X className="w-5 h-5 text-zinc-500 hover:text-red-400 cursor-pointer" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
