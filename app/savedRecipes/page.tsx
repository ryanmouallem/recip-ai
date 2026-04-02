import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SavedRecipesList from './SavedRecipesList';

export default async function SavedRecipesPage() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/savedRecipes');
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <h1 className="font-bold text-6xl tracking-tight mb-1">
          Recipe <span className="text-amber-400">Book</span>
        </h1>
        <h2 className="text-zinc-500 mb-6">Your saved recipes, ready to cook.</h2>
        <SavedRecipesList />
      </div>
    </div>
  );
}
