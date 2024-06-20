// import NextAuth, { DefaultSession } from "next-auth";
// import { User as UserModel } from '@prisma/client';
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//     interface Session {
//       user: {
//         id: number;
//         name: string | null;
//         email: string | null;
//         emailVerified: Date | null;
//         image: string | null;
//         role: Role;
//         username: string;
//       } & DefaultSession["user"];
//     }
//     interface User extends UserModel {
//       id: number;
//       name: string;
//       username: string;
//       role: Role;
//     }
//   }
  
//   declare module "next-auth/jwt" {
//     interface JWT extends DefaultJWT {
//       id: number;
//       name: string | null;
//       email: string | null;
//       emailVerified: Date | null;
//       image: string | null;
//       role: Role;
//       username: string;
//     }
//   }

import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

