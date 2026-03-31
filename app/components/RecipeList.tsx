'use client';
import { Recipe } from '../types/recipe';

type RecipeListProps = {
  recipes: Recipe[];
};

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="flex flex-col gap-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border border-zinc-700 rounded-lg px-5 py-4 bg-zinc-800"
        >
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-semibold text-lg tracking-tight text-zinc-100">
              {recipe.title}
            </h2>
            <button className="text-amber-400 text-sm font-medium ml-4 shrink-0">
              Save
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <span className="text-sm text-zinc-500">{recipe.prepTime} min</span>
            <span className="text-sm text-zinc-500">
              {recipe.servingSize} servings
            </span>
          </div>

          <div className="border-t border-zinc-700 pt-4 flex flex-col gap-2">
            {recipe.instructions.map((step, index) => (
              <p key={index} className="text-sm text-zinc-300">
                {index + 1}. {step}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
