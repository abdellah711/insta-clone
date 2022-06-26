import { getToken } from "next-auth/jwt";
import { NextMiddleware, NextResponse } from "next/server";


export const middleware: NextMiddleware = async (req, ev) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    const url = req.nextUrl.clone()

    if(url.pathname.startsWith('/api/auth')) return NextResponse.next()

    if (url.pathname.startsWith('/auth') && !url.pathname.startsWith('/auth/fb')) {
        if(token){
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    } else {
        if(!token){
            url.pathname = '/auth/login'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}