import Image from "next/image"
import Logo from 'public/assets/images/logo.png'
import DefaultImage from 'public/assets/images/default-profile.png'
import Search from "./Search"
import { useSession } from "next-auth/react"
import Menu from "./Menu"
import { useState } from "react"
import Link from "next/link"

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false)

    const session = useSession()
    const image = session.data?.user.image
    return (
        <nav className="flex justify-center bg-white border-b border-b-gray-300 fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center max-w-5xl px-4 py-2 flex-1">
                <Link href='/'>
                    <a className="flex items-center">
                        <Image src={Logo} width={140} height={40} objectFit="cover" placeholder="blur" priority />
                    </a>
                </Link>
                <Search />
                <div className="relative h-full">
                    <div className="overflow-hidden rounded-full p-0 aspect-square cursor-pointer" onClick={() => setShowMenu(true)}>
                        {image?.startsWith('/') || !image ?
                            <Image src={image ?? DefaultImage} width={50} height={50} layout="fixed" placeholder="blur" />
                            :
                            <img src={image} className="w-[50px] aspect-square object-cover" />
                        }
                    </div>
                    {showMenu && <Menu onClose={() => setShowMenu(false)} />}
                </div>
            </div>
        </nav>
    )
}

export default Navigation