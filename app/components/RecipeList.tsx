'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe, SavedRecipe } from '../types/recipe';

type SaveModeProps = {
  mode: 'save';
  recipes: Recipe[];
};

type RemoveModeProps = {
  mode: 'remove';
  recipes: SavedRecipe[];
  onRemove: (savedId: string) => void;
};

type RecipeListProps = SaveModeProps | RemoveModeProps;

export default function RecipeList(props: RecipeListProps) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  const handleSave = async (recipe: Recipe) => {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });

    if (res.status === 401) {
      router.push('/api/auth/signin?callbackUrl=/');
      return;
    }

    if (res.ok) {
      setSavedIds((prev) => new Set(prev).add(recipe.id));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {props.recipes.map((recipe) => {
        const key = props.mode === 'remove'
          ? (recipe as SavedRecipe).savedId
          : recipe.id;
        const isSaved = savedIds.has(recipe.id);

        return (
          <div
            key={key}
            className="border border-zinc-700 rounded-lg px-5 py-4 bg-zinc-800"
          >
            <div className="flex items-start justify-between mb-2">
              <h2 className="font-semibold text-lg tracking-tight text-zinc-100">
                {recipe.title}
              </h2>
              {props.mode === 'save' ? (
                <button
                  onClick={() => handleSave(recipe)}
                  disabled={isSaved}
                  className="text-amber-400 text-sm font-medium ml-4 shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-60 transition-opacity"
                >
                  {isSaved ? 'Saved ✓' : 'Save'}
                </button>
              ) : (
                <button
                  onClick={() => (props as RemoveModeProps).onRemove((recipe as SavedRecipe).savedId)}
                  className="text-red-400 text-sm font-medium ml-4 shrink-0 cursor-pointer transition-colors hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex gap-4 mb-4">
              <span className="text-sm text-zinc-500">{recipe.prepTime} min</span>
              <span className="text-sm text-zinc-500">{recipe.servingSize} servings</span>
            </div>

            <div className="border-t border-zinc-700 pt-4 flex flex-col gap-2">
              {recipe.instructions.map((step, index) => (
                <p key={index} className="text-sm text-zinc-300">
                  {index + 1}. {step}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
