import axiosConfig from "@/utils/axiosConfig";
import { AxiosError } from "axios";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const {
          data: { data: user, token },
        }: {
          data: {
            data: User;
            token: string
          };
        } = await axiosConfig.post("users/auth", {
          email: credentials?.email,
          password: credentials?.password,
        });

        return { ...user, token};
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message)
        }
        throw error
      }
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 3600,
    secret: "SECRET_NEXT_AUTH_CODE"
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token

      return session
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
