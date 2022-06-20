import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import prisma from "lib/prisma"
import { compare } from "bcrypt"


export default NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { type: "email", label: "email" },
                password: { type: "password", label: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null
                const user = await prisma.user.findUnique({ where: { email: credentials.email } })
                if (!user) return null
                if (await compare(credentials.password, user.password)) {
                    const { id, email, username } = user
                    return { id, email, username }
                }

                return null
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn:'/auth/login'
    },
    secret: process.env.JWT_SECRET
})