import Image from "next/image"
import { FC } from "react"
import DefaultImage from 'public/assets/images/default-profile.png'
import Link from "next/link"
import { UserPublicInfo } from "types/user"


interface Props {
    user: UserPublicInfo;
    onClick: () => void;
}

const SearchItem: FC<Props> = ({ user, onClick }) => {
    return (
        <div className="p-2 hover:bg-gray-100">
            <Link href={'/profile/' + user.id}>
                <a className="flex gap-3 items-center" onClick={onClick}>
                    <div className="overflow-hidden rounded-full aspect-square w-fit">
                        <Image src={user.image ?? DefaultImage} width={50} height={50} />
                    </div>
                    <div className="text-[.9rem]">
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-gray-600">{user.fullname}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default SearchItem