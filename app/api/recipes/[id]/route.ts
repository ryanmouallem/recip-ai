import { auth } from '@/auth';
import sql from '@/app/lib/db';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await sql`
    DELETE FROM saved_recipes
    WHERE id = ${id} AND user_id = ${session.user.id}
  `;

  return Response.json({ success: true });
}
