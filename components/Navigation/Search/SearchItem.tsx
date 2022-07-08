import Image from "next/image"
import { FC } from "react"
import DefaultImage from 'public/assets/images/default-profile.png'
import Link from "next/link"
import { UserPublicInfo } from "types/user"
import RemoveIcon from 'public/assets/icons/red-x.svg'


interface Props {
    user: UserPublicInfo;
    onClick: () => void;
    onRemove?: () => void;
}

const SearchItem: FC<Props> = ({ user, onClick,onRemove }) => {
    return (
        <li className="p-2 hover:bg-gray-100 flex">
            <Link href={'/profile/' + user.id}>
                <a className="flex gap-3 items-center flex-1" onClick={onClick}>
                    <div className="overflow-hidden rounded-full aspect-square w-fit">
                        <Image src={user.image ?? DefaultImage} width={50} height={50} />
                    </div>
                    <div className="text-[.9rem]">
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-gray-600">{user.fullname}</p>
                    </div>
                </a>
            </Link>
            {onRemove && (<button onClick={onRemove}>
                <RemoveIcon className="fill-gray-400 w-7 mx-2 active:scale-75 transition" />
            </button>)
            }
        </li>
    )
}

export default SearchItem