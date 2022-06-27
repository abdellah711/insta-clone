import { NextApiHandler } from "next"
import prisma from 'lib/prisma'
import { getToken } from "next-auth/jwt";


interface IResponse {
    message?: string;
    username?: string;
}

const updateUsername: NextApiHandler<IResponse> = async (req, res) => {
    const { username } = req.body
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token) return res.status(401).json({ message: 'You are not authenticated' })
    if (!username) return res.status(400).json({ message: 'No username provided' })

    const exists = await prisma.user.findUnique({ where: { username: (<string>username).toLowerCase() } })
    if (exists) return res.status(403).json({ message: 'Username already exists' })

    const user = await prisma.user.update({ data: { username }, where: { id: +token.id }, select: { username: true } })
    res.json({ username: <string>user.username })
    
}

export default updateUsername