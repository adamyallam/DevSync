import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/db/prisma'



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: 'user/registration/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })


        if (!user) {
          return null
        }

        const validPassword = await bcrypt.compare(credentials.password, user.password)

        if (!validPassword) {
          return null
        }


        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id),
        token.firstName = user.firstName,
        token.lastName = user.lastName,
        token.username = user.username,
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id,
        session.firstName = token.firstName,
        session.lastName = token.lastName,
        session.username = token.username,
        session.email = token.email
      }
      return session
    }
  }
}

export default authOptions