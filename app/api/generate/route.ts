import { Recipe } from '@/app/types/recipe';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const buildRecipePrompt = (ingredients: string[]) =>
  `
You are a recipe generator for an AI meal planner app.

Task:
Generate exactly 5 recipe ideas using only the provided ingredients.

Rules:
- Use only the ingredients explicitly provided.
- Do not add any extra ingredients, pantry staples, oils, spices, sauces, or garnishes unless they are included.
- Keep recipes realistic and practical.
- If ingredients are limited, make simple recipes.

Each recipe must include:
- "title": string
- "servingSize": integer
- "prepTime": integer (minutes)
- "instructions": array of strings

Provided ingredients:
${JSON.stringify(ingredients)}

Output requirements:
- Return exactly 5 recipe objects in a JSON array.
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
