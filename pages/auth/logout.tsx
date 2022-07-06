import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

const Logout: NextPage = ({ }) => {
    const { status } = useSession()
    const router = useRouter()
    const isLogingOut = useRef(false)
    useEffect(() => {
        if(isLogingOut.current) return
        if (status === "authenticated") {
            isLogingOut.current = true
            signOut({ callbackUrl: '/auth/login' })
        } else if (status === 'unauthenticated') {
            router.replace('/auth/login')
        }
    }, [status])

    return (
        <>
        </>
    )
}

export default Logout