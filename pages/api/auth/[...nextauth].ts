import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import Facebook from 'next-auth/providers/facebook'
import prisma from "lib/prisma"
import { compare } from "bcrypt"
import fs from 'fs'

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
        if (!user || !user.password) return null
        if (await compare(credentials.password, user.password)) {
          const { id, email, username, fullname, image } = user
          return { id, email, username, name: fullname, image }
        }

        return null
      }
    }),
    Facebook({
      clientId: <string>process.env.FB_CLIENT_ID,
      clientSecret: <string>process.env.FB_SECRET,
      userinfo: {
        url: "https://graph.facebook.com/me",
        params: {
          fields: "id,name,email,picture.type(large)",
        }
      },
      async profile(profile, tokens) {

        let user = await prisma.user.findUnique({ where: { fId: +profile.id } })

        if (!user) {
          let image = profile?.picture?.data?.url
          if (image) {
            try {
              const resp = await fetch(image)
              if (resp?.ok) {
                const buffer = Buffer.from(await resp.arrayBuffer())
                const im = `/assets/images/users/${profile.id}-${Date.now()}.jfif`
                fs.createWriteStream('./public' + im).write(buffer)
                image = im
              }
            } catch { }
          }
          const condition = profile.email ? { email: profile.email } : { fId: +profile.id }
          user = await prisma.user.upsert({
            where: condition,
            create: {
              email: profile.email,
              fullname: profile.name.toLowerCase(),
              image,
              fId: +profile.id,
            },
            update: {
              email: profile.email,
              fullname: profile.name.toLowerCase(),
              image,
              fId: +profile.id,
            }
          })

        }

        const { id, email, username, fullname, image } = user
        return { id: id + "", email, name: fullname, username, image }
      },

    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {

        session.user.id = +token.id;
        session.user.username = token.username as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.JWT_SECRET
})