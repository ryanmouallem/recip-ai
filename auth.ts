
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import sql from "@/app/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.id) return true

      try {
        await sql`
          INSERT INTO users (id, name, email, image)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${user.image})
          ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name,
                image = EXCLUDED.image
        `
      } catch {}

      return true
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})