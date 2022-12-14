import { NextApiHandler } from "next";
import formidable from 'formidable'
import type { Fields, Files, File } from 'formidable'
import fs from 'fs'
import { getToken } from "next-auth/jwt";
import { promisify } from "util";
import prisma from 'lib/prisma'

interface IResponse {
    message?: string;
}

const copyFile = promisify(fs.copyFile)

const handler: NextApiHandler<IResponse> = async (req, res) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token) return res.status(401).json({ message: 'You are not authenticated' })

    const data = await new Promise<{ fields: Fields, files: Files }>((resolve, reject) => {
        const form = formidable()

        form.parse(req, (err, fields, files) => {
            if (err) reject({ err })
            resolve({ fields, files })
        })
    })
    const description = data.fields['description'] as string
    const image = data.files['image'] as File
    if (!image || !description) return res.status(400).json({ message: 'Missing fields' })


    const imagePath = `/assets/images/posts/${token.id}-${Date.now()}${image.originalFilename}`
    const basePath = process.env.NODE_ENV === 'development' ? './public' : '.'

    await copyFile(image.filepath, basePath + imagePath)
    await prisma.post.create({
        data: {
            image: imagePath,
            content: description,
            userId: +token.id,
        }
    })
    res.json({ message: "content posted successfully" })
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler