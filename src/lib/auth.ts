import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { hash, compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") {
        //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: "/login", //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        return null; //(5)
        //   return userService.authenticate(username, password); //(5)
      },
    }),
  ],
};

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function getServerAuthSession(
  req: any,
  res: any
): Promise<Session | null> {
  return await getServerSession(req, res, authOptions);
}
