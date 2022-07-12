import { FollowersModal } from "components/Modals";
import { FC, useEffect, useState } from "react"
import { PostWithUser } from "types/post";
import { UserProfile, UserPublicInfo } from "types/user";
import Header from "./Header";
import Posts from "./Posts";



interface Props {
    user: UserProfile;
    posts: PostWithUser[];
}

const Profile: FC<Props> = ({ user, posts }) => {
    const [followers, setFollowers] = useState<UserPublicInfo[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const handleDialogOpen = async (following = false) => {
        setIsOpen(true)
        setLoading(true)
        const controller = new AbortController()
        const fetchUsers = async () => {
            try {
                const resp = await fetch(`/api/users/${user.id}/${following ? 'following' : 'followers'}`, { signal: controller.signal })
                if (resp?.ok) {
                    const { data } = await resp.json()
                    setFollowers(data)
                }
            } catch (err) {
                console.error(err)
                setError(true)
            }
            setLoading(false)
        }

        fetchUsers()
        setIsFollowing(following)
        return () => {
            controller.abort()
            setLoading(false)
        }

    }

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <Header user={user} onFollowersClick={() => handleDialogOpen()} onFollowingClick={() => handleDialogOpen(true)} />
                <Posts posts={posts} />
            </div>

            {isOpen && <FollowersModal loading={loading} error={error} followers={followers} isFollowing={isFollowing} onClose={() => setIsOpen(false)} />}
        </>
    )
}

export default Profile