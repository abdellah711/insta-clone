import Link from "next/link"

import { FC, MouseEventHandler, useState } from "react"

import { UserPublicInfo } from "types/user";

interface Props {
    user: UserPublicInfo;
}

const Suggestion: FC<Props> = ({ user }) => {
    const [isFollowed, setIsFollowed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleFollow: MouseEventHandler = async e => {
        setIsLoading(true)
        try {
            const resp = await fetch(`/api/users/${user.id}/follow`)
            if (resp?.ok) {
                const { followed } = await resp.json()
                setIsFollowed(followed)
            }
        } catch { }
        setIsLoading(false)
    }

    return (
        <div className='flex items-center mb-3'>
            <Link href={'/profile/' + user.id}>
                <a className='flex flex-1 gap-3 items-center'>
                    <img
                        className='w-10 aspect-square rounded-full border border-gray-400'
                        src={user.image ?? '/assets/images/default-profile.png'} />
                    <div className='flex-1'>
                        <p className='hover:underline'>{user.username}</p>
                        <p className='text-xs text-gray-500'>{user.fullname}</p>
                    </div>
                </a>
            </Link>
            <button className={isFollowed ? '' : 'text-blue-500'} onClick={handleFollow}>
                {isLoading ?
                    <div className="border-2 w-5 aspect-square border-gray-800 rounded-full border-t-transparent animate-spin"/>
                    :
                    isFollowed ? 'Following' : 'Follow'
                }
            </button>
        </div>
    )
}

export default Suggestion
