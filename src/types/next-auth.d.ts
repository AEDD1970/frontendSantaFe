import { type DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    email: string
    token: string
  }
  interface Session {
    user?: User & DefaultUser
  }
}
