import NextAuth, {type NextAuthOptions}from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "../../../../db/db-connections/user"


const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/registration/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        })

        if (!existingUser) {
          return null
        }

        const validPassword = await bcrypt.compare(credentials.password, existingUser.password)

        if (!validPassword) {
          return null
        }
        
        return {
          id: `${existingUser.id}`,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          username: existingUser.username,
          email: existingUser.email,
        }
      }})
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
          username: token.username
        }
      }
      return session
    }
  } 
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }