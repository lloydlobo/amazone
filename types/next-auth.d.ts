import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            name: ReactNode
            /** The user's postal address. */
            address: string
        }
    }
}
