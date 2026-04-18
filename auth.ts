import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Hasło studia",
      credentials: {
        password: { label: "Hasło", type: "password" },
      },
      authorize: async (credentials) => {
        const password = credentials?.password;
        const hash = process.env.STUDIO_PASSWORD_HASH;
        if (
          typeof password !== "string" ||
          password.length < 1 ||
          typeof hash !== "string" ||
          hash.length < 10
        ) {
          return null;
        }
        const ok = await bcrypt.compare(password, hash);
        if (!ok) return null;
        return { id: "admin", name: "Administrator" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: "/studio/logowanie",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
});
