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
        const hash = process.env.STUDIO_PASSWORD_HASH?.trim();

        if (typeof password !== "string" || password.length < 1) {
          return null;
        }

        if (!hash || hash.length < 20) {
          if (process.env.NODE_ENV === "development") {
            console.error(
              "[auth] Ustaw w .env STUDIO_PASSWORD_HASH (wynik polecenia: npm run studio:hash-password).",
            );
          }
          return null;
        }

        if (!/^\$2[aby]\$\d{2}\$/.test(hash)) {
          if (process.env.NODE_ENV === "development") {
            console.error(
              "[auth] STUDIO_PASSWORD_HASH musi być pełnym hashem bcrypt (zaczyna się od $2a$, $2b$ lub $2y$), nie samym hasłem.",
            );
          }
          return null;
        }

        try {
          const ok = await bcrypt.compare(password, hash);
          if (!ok) return null;
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.error(
              "[auth] Błąd przy weryfikacji hasła (np. uszkodzony hash w .env). Szczegóły:",
              err,
            );
          }
          return null;
        }

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
