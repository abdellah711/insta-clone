import Image from "next/image"
import Logo from 'public/assets/images/logo.png'
import DefaultImage from 'public/assets/images/default-profile.png'
import Search from "./Search"

const Navigation = () => {
    return (
        <nav className="flex justify-center bg-white border-b border-b-gray-300">
            <div className="flex justify-between items-center max-w-5xl px-4 py-2 flex-1">
                <Image src={Logo} width={140} height={40} objectFit="cover" placeholder="blur" priority/>
                <Search/>
                <div className="overflow-hidden rounded-full p-0 aspect-square cursor-pointer">
                    <Image src={DefaultImage} width={50} height={50} layout="fixed" placeholder="blur"/>
                </div>
            </div>
        </nav>
    )
}

export default Navigation