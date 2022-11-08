import formidable, { Fields, File, Files } from "formidable";
import { NextApiHandler } from "next";
import fs from 'fs'
import { getToken } from "next-auth/jwt";
import { promisify } from "util";
import prisma from 'lib/prisma'


const copyFile = promisify(fs.copyFile)

const handler: NextApiHandler = async (req, res) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token) return res.status(401).json({ message: 'You are not authenticated' })

    const data = await new Promise<{ fields: Fields, files: Files }>((resolve, reject) => {
        const form = formidable()

        form.parse(req, (err, fields, files) => {
            if (err) reject({ err })
            resolve({ fields, files })
        })
    })

    const photo = data.files['photo'] as File

    const imagePath = `/assets/images/users/${token.id}-${Date.now()}${photo.originalFilename}`
    const basePath = process.env.NODE_ENV === 'development' ? './public' : '.'

    await copyFile(photo.filepath, basePath + imagePath)

    await prisma.user.update({
        where: {
            id: +token.id,
        },
        data: {
            image: imagePath
        }
    })

    res.json({ url: imagePath })
}

export const config = {
    api: {
        bodyParser: false
    }
}


export default handler