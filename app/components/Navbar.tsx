import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="w-full border-b border-zinc-700 bg-zinc-900 px-6 py-3 flex items-center justify-end">
      {session?.user ? (
        <div className="flex items-center gap-3">
          <Link
            href="/savedRecipes"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Recipe Book
          </Link>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm text-zinc-400">{session.user.name}</span>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button
            type="submit"
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors"
          >
            Sign in with Google
          </button>
        </form>
      )}
    </nav>
  )
}
