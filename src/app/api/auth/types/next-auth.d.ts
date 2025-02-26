import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend NextAuth Session and JWT types
declare module "next-auth" {
  interface Session {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isDemo: boolean;
  }

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isDemo: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isDemo: boolean;
  }
}