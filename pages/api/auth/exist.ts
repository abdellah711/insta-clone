import { NextApiHandler } from "next";
import prisma from "lib/prisma";

interface IResponse {
    message?:string;
    exists?: boolean;
}

const exist: NextApiHandler<IResponse> = async (req, res) => {
    const { email, username } = req.query
    if (username) {
        const exists = await prisma.user.findUnique({ where: { username: (<string>username).toLowerCase() } })
        return res.json({ exists: !!exists })
    }
    if (email) {
        const exists = await prisma.user.findUnique({ where: { email: (<string>email).toLowerCase() } })
        return res.json({ exists: !!exists })
    }

    res.status(400).json({message:"Unvalid request!"})
}


export default exist