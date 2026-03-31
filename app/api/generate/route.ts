import { Recipe } from '@/app/types/recipe';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const buildRecipePrompt = (ingredients: string[]) =>
  `
You are a recipe generator for an AI meal planner app.

Task:
Generate exactly 3 recipe ideas using only the provided ingredients.

Pre-processing:
- Correct any obvious misspellings of ingredient names before generating recipes.
- Identify and remove any non-food items from the ingredient list. If all ingredients are non-food, return an empty JSON array.
- Remove duplicate ingredients.
- If fewer than 2 valid food ingredients remain after filtering, return an empty JSON array.

Rules:
- Use only the valid food ingredients provided.
- Do not add any extra ingredients, pantry staples, oils, spices, sauces, or garnishes unless they are explicitly included.
- Keep recipes realistic and practical.
- If ingredients are limited, make simple recipes.
- Always write recipes in English regardless of the language the ingredients are provided in.
- You may assume the user has basic pantry staples including salt, pepper, and common dried spices. Do not assume oils, sauces, dairy, or any other ingredients beyond basic seasoning.
- At the end of each recipe's instructions array, you may add optional enhancement suggestions as strings starting with "Optional:" suggesting common household ingredients that would improve the dish. These are purely suggestions and not required.
- prepTime should be realistic and account for all preparation and cooking steps. Factor in chopping, preheating, and actual cook times. Do not underestimate.

Each recipe must include:
- "title": string
- "servingSize": integer
- "prepTime": integer (minutes)
- "instructions": array of strings (each step as a separate string)

Provided ingredients:
${JSON.stringify(ingredients)}

Output requirements:
- Return exactly 3 recipe objects in a JSON array.
- Return valid JSON only.
- No markdown.
- No code fences.
- No explanations.
- No extra text.
`.trim();

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: buildRecipePrompt(ingredients),
    });

    const text = response.text;

    if (!text) throw new Error('No response from Gemini');

    const cleaned = text.replace(/^```json\s*|^```\s*|```$/gm, '').trim();
    const recipes = JSON.parse(cleaned).map((recipe: Recipe) => ({
      ...recipe,
      id: crypto.randomUUID(),
    }));

    return Response.json(recipes);
  } catch (error) {
    return Response.json(
      { error: 'Failed to generate recipes' },
      { status: 500 },
    );
  }
}
