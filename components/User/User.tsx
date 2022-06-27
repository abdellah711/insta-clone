import type { User as IUser } from "@prisma/client"
import Link from "next/link"

import { FC, MouseEventHandler, useState } from "react"

interface UserWithIsFollowed {

}

interface Props {
    user: IUser;
}

const User: FC<Props> = ({ user }) => {
    const [isFollowed, setIsFollowed] = useState(false)

    const handleFollow: MouseEventHandler = e => setIsFollowed(!isFollowed)

    return (
        <div className='flex items-center mb-3'>
            <Link href={'/profile/' + user.id}>
                <a className='flex flex-1 gap-3 items-center'>
                    <img
                        className='w-10 rounded-full border border-gray-400'
                        src={user.image ?? '/assets/images/default-profile.png'} />
                    <div className='flex-1'>
                        <p className='hover:underline'>{user.username}</p>
                        <p className='text-xs text-gray-500'>{user.fullname}</p>
                    </div>
                </a>
            </Link>
            <button className={isFollowed ? '':'text-blue-500'} onClick={handleFollow}>{isFollowed ?'Following' : 'Follow'}</button>
        </div>
    )
}

export default User
