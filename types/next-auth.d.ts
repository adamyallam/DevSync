import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    firstName: string,
    lastName: string,
    username: string
  }

  interface Session {
    user: User &{
      username: string
    }
    token: {
        username: string
    }
  }
}