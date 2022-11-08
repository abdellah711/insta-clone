import { ChangeEventHandler, FC, useState } from "react"
import Image from 'next/image'
import DefaultImage from 'public/assets/images/default-profile.png'
import { useSession } from "next-auth/react"
import { UserProfile } from "types/user"

interface Props {
    user: UserProfile,
    onFollowersClick?: () => void;
    onFollowingClick?: () => void;
}

const Header: FC<Props> = ({ user, onFollowersClick, onFollowingClick }) => {
    const [isFollowed, setIsFollowed] = useState(user.followers.length > 0)
    const [profilePhoto, setProfilePhoto] = useState(user.image ?? DefaultImage)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const { data } = useSession()

    const isCurrentUserProfile = data?.user.id === user.id

    const handePhotoUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
        const photo = e.currentTarget.files?.[0]
        if (!photo) return

        const data = new FormData()
        data.append('photo', photo, photo.name)
        setIsUploading(true)

        fetch('/api/profile/photo', {
            method: 'POST',
            body: data,
        }).then(res => {
            if (!res?.ok) {
                throw new Error()
            }
            return res.json()
        }).then(({ url }) => {
            setIsUploading(false)
            setProfilePhoto(url)
        }).catch(() => setIsUploading(false))

    }


    const handleFollow = async () => {
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
        <div className="grid grid-cols-[auto_1fr] gap-4 px-4 md:gap-x-16 lg:gap-x-24 md:py-4">
            <label
                className="rounded-full overflow-hidden relative md:w-32 w-20 aspect-square block md:row-span-3 cursor-pointer"
            >
                {isCurrentUserProfile &&
                    <input
                        type="file"
                        name="img"
                        className="hidden"
                        accept="image/*"
                        onChange={handePhotoUpload}
                    />
                }
                <Image src={profilePhoto} objectFit="cover" layout="fill" priority />
                {/* progress bar */}
                {
                    isUploading && (
                        <div className="absolute inset-0 bg-black/5 grid place-items-center">
                            <div className="rounded-full w-7 aspect-square border-2 border-black/20 border-t-black/80 animate-spin" />
                        </div>
                    )
                }
            </label>
            <div className="md:flex md:gap-6">
                <h1 className="text-3xl font-light overflow-hidden text-ellipsis text-gray-700">{user.username}</h1>
                {
                    !isCurrentUserProfile && (
                        isLoading ?
                            <div className="w-6 mt-2 lg:mt-0 aspect-square border-[3px] border-gray-700 self-center rounded-full border-t-transparent mx-8 animate-spin" />
                            :
                            <button
                                className={"rounded border py-1 px-3 mt-2 md:self-center md:m-0 " + (isFollowed ? "border-gray-300 font-semibold" : "bg-blue-500 text-white")}
                                onClick={handleFollow}
                            >
                                {isFollowed ? 'Unfollow' : 'Follow'}
                            </button>
                    )}
            </div>
            <p className="col-span-2 md:col-span-1 md:row-start-3 md:col-start-2 font-semibold capitalize">{user.fullname}</p>
            <div className="flex justify-center col-span-2 border-y border-gray-200 p-2 -mx-4 md:col-span-1 md:border-none md:gap-7 md:justify-start md:-m-0">
                <LabelValue label="posts" value={user._count.posts} />
                <LabelValue label="followers" value={user._count.followers} onClick={onFollowersClick} />
                <LabelValue label="following" value={user._count.following} onClick={onFollowingClick} />
            </div>
        </div>
    )
}



const LabelValue: FC<{ label: string, value: number | string, onClick?: () => void }> = ({ label, value, onClick }) => {
    return (
        <p className="flex flex-col flex-1 items-center text-gray-500 md:flex-grow-0 md:flex-row md:text-gray-900 md:gap-2" role="button" onClick={+value === 0 ? undefined : onClick}>
            <span className="font-semibold text-black">{value}</span>
            {label}
        </p>
    )
}


export default Header