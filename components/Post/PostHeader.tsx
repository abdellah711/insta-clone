import Link from "next/link"
import { FC } from "react"
import MenuIcon from 'public/assets/icons/3dots.svg'
import { User } from "@prisma/client"


interface Props {
    owner: Partial<User>;
}

const PostHeader: FC<Props> = ({ owner }) => {
    return (
        <header className="p-2 flex">
            <Link href={'/profile/' + owner.id}>
                <a className="flex gap-3 items-center cursor-pointer flex-1">
                    <img
                        className="w-11 aspect-square overflow-hidden rounded-full border border-gray-400"
                        src={owner.image ?? '/assets/images/default-profile.png'}
                    />
                    <div>
                        <p className="font-semibold">{owner.username}</p>
                        <p className="text-sm text-gray-500">{owner.fullname}</p>
                    </div>
                </a>
            </Link>
            <button className="fill-gray-600 p-1">
                <MenuIcon className="w-5" />
            </button>
        </header>
    )
}

export default PostHeader