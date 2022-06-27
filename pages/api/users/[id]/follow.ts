import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import prisma from 'lib/prisma'

interface IResponse {
    followed?: boolean;
    message?: string;
}

const handler: NextApiHandler<IResponse> = async (req, res) => {
    const { id } = req.query

    if (!id) return res.status(400).json({ message: "Invalid request" })

    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token) return res.status(401).json({ message: 'You are not authenticated' })

    const follows = await prisma.follows.deleteMany({
        where: {
            AND: {
                followedId: +id,
                followerId: +token.id
            }
        }
    })

    if (follows.count > 0) {
        return res.json({ followed: false })
    }

    await prisma.follows.create({
        data: {
            followedId: +id,
            followerId: +token.id
        }
    })

    res.json({ followed: true })
}

export default handler