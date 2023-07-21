import prisma from '../../../lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

/**
 * Using adapter from next-auth
 * @auth/prisma-adapter": "^1.0.1" not TS compatible
 *
 * @see https://github.com/nextauthjs/next-auth/pull/7443
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const customSession = {
        user: {
          id: user.id,
          name: session.user?.name ?? null,
          email: session.user?.email ?? null,
          image: session.user?.image ?? null,
        },
        expires: session.expires,
      };

      return Promise.resolve(customSession);
    },
  },
};

export default NextAuth(authOptions);
