import Image from "next/image"
import Logo from 'public/assets/images/logo.png'
import DefaultImage from 'public/assets/images/default-profile.png'
import Search from "./Search"
import { useSession } from "next-auth/react"
import Menu from "./Menu"
import { useState } from "react"
import Close from 'public/assets/icons/close.svg'
import Link from "next/link"
import { NewPostModal } from "components/Modals"

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const session = useSession()
    const image = session.data?.user.image

    const handlePlusClick = () => setShowModal(true)

    return (
        <nav className="flex justify-center bg-white border-b border-b-gray-300 fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center max-w-5xl px-4 py-2 flex-1">
                <Link href='/'>
                    <a className="flex items-center">
                        <Image src={Logo} width={140} height={40} objectFit="contain" placeholder="blur" priority />
                    </a>
                </Link>
                <Search />
                <div className="h-full flex gap-3">
                    <div className="border-2 border-gray-700 rounded-lg self-center p-1 cursor-pointer" onClick={handlePlusClick}>
                        <Close className="rotate-45 w-5 fill-gray-700" />
                    </div>
                    <div className="relative">
                        <div className="overflow-hidden rounded-full p-0 aspect-square cursor-pointer" onClick={() => setShowMenu(true)}>
                            {image?.startsWith('/') || !image ?
                                <Image src={image ?? DefaultImage} width={50} height={50} layout="fixed" />
                                :
                                <img src={image} className="w-[50px] aspect-square object-cover" />
                            }
                        </div>
                        {showMenu && <Menu onClose={() => setShowMenu(false)} userId={session.data?.user.id}/>}
                    </div>
                </div>
            </div>
            {showModal && <NewPostModal onClose={() => setShowModal(false)} />}
        </nav>
    )
}

export default Navigation