import Image from "next/image";
import { FC, useState } from "react"
import { UserPublicInfo } from "types/user"
import Modal from "./Modal";
import DefaultImage from 'public/assets/images/default-profile.png'
import Link from "next/link";
import { useSession } from "next-auth/react";


interface Props {
    followers: UserPublicInfo[] | null;
    loading: boolean;
    error: boolean;
    isFollowing?: boolean;
    onClose: () => void;
}

const FollowersModal: FC<Props> = ({ followers, loading, error, isFollowing = false, onClose }) => {
    const { data } = useSession()

    return (
        <Modal style={{ width: 'min(90vw,500px)' }} onClose={onClose}>

            <h2 className="font-semibold text-center py-3 text-md border-b border-b-gray-200">{isFollowing ? 'Following' : 'Followers'}</h2>
            <div className="grid place-items-center h-[40vh]">
                {
                    loading ?
                        <div className="w-7 aspect-square border-2 border-black border-t-transparent rounded-full animate-spin" />
                        :
                        (error ?
                            <p className="text-gray-500">Something went wrong!</p>
                            :

                            <ul className="list-none w-full p-4 h-full overflow-y-auto">
                                {followers?.map(follower => (<FollowerItem key={follower.id} user={follower} onNav={onClose} userID={+(data?.user.id ?? -1)} />))}
                            </ul>
                        )
                }
            </div>
        </Modal >
    )
}


const FollowerItem: FC<{ user: UserPublicInfo, onNav: () => void, userID: number }> = ({ user, onNav, userID }) => {
    const [followed, setFollowed] = useState(true)
    const [isLoading, setIsLoading] = useState(false)


    const handleFollow = async () => {
        setIsLoading(true)
        try {
            const resp = await fetch(`/api/users/${user.id}/follow`)
            if (resp?.ok) {
                const { followed } = await resp.json()
                setFollowed(followed)
            }
        } catch { }
        setIsLoading(false)
    }

    return (
        <li className='flex items-center mb-3'>
            <Link href={'/profile/' + user.id}>
                <a className='flex flex-1 gap-3 items-center' onClick={onNav}>
                    <div className="w-10 rounded-full border border-gray-400 relative aspect-square overflow-hidden">
                        <Image src={user.image ?? DefaultImage} layout="fill" alt={`'${user.fullname}' profile image`} />
                    </div>
                    <div className='flex-1'>
                        <p className='hover:underline'>{user.username}</p>
                        <p className='text-xs text-gray-500'>{user.fullname}</p>
                    </div>
                </a>
            </Link>
            
            {userID !== user.id && (

                <button className={"border px-4 py-1 rounded " + (followed ? 'border-gray-500' : 'text-blue-500 border-blue-500')} onClick={handleFollow}>
                    {isLoading ?
                        <div className="border-2 w-5 aspect-square border-gray-800 rounded-full border-t-transparent animate-spin" />
                        :
                        (followed ? 'Following' : 'Follow')
                    }
                </button>
            )
            }
        </li>
    )
}


export default FollowersModal