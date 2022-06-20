import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/prisma";
import { NextApiHandler } from "next";
import { object, string } from 'yup'
import bcrypt from 'bcrypt'

const signup: NextApiHandler<{ message?: string }> = async (req, res) => {
    const userData = req.body
    if(!userData) return res.status(400).json({message:"No data provided"})

    const userSchema = object({
        email: string().email("Please enter a valid email").required().lowercase(),
        password: string().min(6).required(),
        username: string().required().lowercase(),
        fullname: string().required().lowercase()
    })
    
    try {
        const data = await userSchema.validate(userData).catch(err => res.status(400).json({ message: err.message }))
        if (!data) return
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
        await prisma.user.create({ data })
        res.json({ message: "Account created successfully" })

    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(403).json({ message: `${(<string[]>err.meta?.target)?.[0]} is already registered` })
            }
        }
        console.log({err})
        res.status(500).json({message:'Something went wrong!'})
    }

}

export default signup