import { NextApiHandler } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";

interface IResponse {
    message?: string;
}

const handler: NextApiHandler<IResponse> = async (req, res) => {
    const { id } = req.query
    if (!id) return res.status(400).json({ message: "Invalid request" })

    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token) return res.status(401).json({ message: 'You are not authenticated' })
    
    const like = await prisma.like.deleteMany({
        where: {
            AND: {
                postId: +id,
                userId: +token.id
            }
        }
    })

    if (like.count > 0) {
        return res.json({ message: "Post unliked successfully" })
    }

    await prisma.like.create({
        data: {
            postId: +id,
            userId: +token.id
        }
    })

    res.json({ message: "Post liked successfully" })
}

export default handler