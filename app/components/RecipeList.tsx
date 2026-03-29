'use client';
import { Recipe } from '../types/recipe';

type RecipeListProps = {
    recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div>
        <h1>Recipe List</h1>
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.prepTime} Minutes</p>
                    <p>{recipe.servingSize} Servings</p>
                    {recipe.instructions.map((step, index) => (
                        <p key={index}>{step}</p>
                    ))}
                </div>
            ))}
    </div>
  );
}
