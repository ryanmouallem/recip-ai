import { auth } from '@/auth';
import sql from '@/app/lib/db';
import { Recipe, SavedRecipe } from '@/app/types/recipe';

type SavedRecipeRow = {
  id: string;
  data: Recipe;
};

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = (await sql`
    SELECT id, data FROM saved_recipes
    WHERE user_id = ${session.user.id}
    ORDER BY created_at DESC
  `) as SavedRecipeRow[];

  const recipes: SavedRecipe[] = rows.map((row) => ({
    savedId: row.id,
    ...row.data,
  }));

  return Response.json(recipes);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const recipe: Recipe = await req.json();

  try {
    await sql`
      INSERT INTO saved_recipes (user_id, title, data)
      VALUES (
        ${session.user.id},
        ${recipe.title},
        ${JSON.stringify(recipe)}::jsonb
      )
    `;
  } catch {
    return Response.json({ error: 'Failed to save recipe' }, { status: 500 });
  }

  return Response.json({ success: true });
}
