import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import { UserPublicInfo } from "types/user";
import prisma from 'lib/prisma'

interface IResponse {
    message?: string;
    data?: UserPublicInfo[]
}

const handler: NextApiHandler<IResponse> = async (req, res) => {
    const { id } = req.query
    if (Number.isNaN(+id)) return res.status(400).json({ message: 'Invalid request' })

    const token = getToken({ req })

    if (!token) return res.status(401).json({ message: 'You are not authenticated' })

    try {

        const data = await prisma.follows.findMany({
            where: {
                followedId: +id
            },
            include: {
                follower: { select: { username: true, id: true, fullname: true, image: true } }
            }
        })

        return res.json({ data: data.map(u => u.follower) })

    } catch (err) {
        console.error(err)
    }
    res.status(500).json({ message: 'Something went wrong!' })
}

export default handler