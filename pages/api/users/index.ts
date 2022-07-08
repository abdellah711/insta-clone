import { NextApiHandler } from "next";
import { UserPublicInfo } from "types/user";
import prisma from 'lib/prisma'

interface IResponse {
    data: UserPublicInfo[];
    message?: string;
}

const handler: NextApiHandler<IResponse> = async (req, res) => {
    let { search } = req.query

    if (!search) return res.json({ data: [] })

    search = (search as string).toLowerCase()

    try {
        const data = await prisma.user.findMany({
            where: {
                OR: [
                    {fullname: { contains: search }},
                    {username: { contains: search }}
                ]
            },
            select: { username: true, image: true, fullname: true, id: true }
        })
        res.json({ data })
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ data: [], message: 'Something went wrong!' })
    }


}

export default handler