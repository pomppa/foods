// pages/api/auth/[...nextauth].js
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/withSession';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add more providers as needed
  ],
  // NextAuth.js configuration options
};

const handler = async (req, res) => {
  await NextAuth(req, res, authOptions);
};

export default withIronSessionApiRoute(handler, sessionOptions);
