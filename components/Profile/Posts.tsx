import type { Post } from "@prisma/client"
import Image from "next/image"
import { FC, useState } from "react"
import CameraIcon from 'public/assets/icons/camera.svg'
import PostDetailsModal from "components/Modals/PostDetailsModal"
import { PostWithUser } from "types/post"

interface Props {
    posts: PostWithUser[]
}

const Posts: FC<Props> = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null)

    const handleClick = (post: PostWithUser) => {
        setSelectedPost(post)
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 px-2 gap-4 lg:gap-9 mt-10 border-t border-t-gray-300/70 pt-10">
                {posts.length > 0 ?
                    posts.map(p => <Post post={p} key={p.id} onClick={() => handleClick(p)}/>)
                    :
                    <div className="flex flex-col items-center justify-center col-span-3 gap-2 min-h-[50vh]">
                        <CameraIcon className="fill-transparent stroke-current stroke-[30] w-20" />
                        <p className="font-light text-3xl">No posts yet</p>
                    </div>
                }
            </div>
            <PostDetailsModal post={selectedPost} onClose={()=>setSelectedPost(null)}/>
        </>
    )
}

interface PostProps {
    post: PostWithUser;
    onClick: () => void;
}

const Post: FC<PostProps> = ({ post, onClick }) => {


    return (
        <div className="overflow-hidden rounded relative group cursor-pointer" onClick={onClick}>
            <Image src={post.image} layout="responsive" width={400} height={400} sizes="(max-width: 896px) 30vw; 350px" objectFit="cover" />
            <div className="absolute inset-0 flex justify-center items-center gap-3 bg-gray-900/10 transition duration-150 opacity-0 group-hover:opacity-100">
                <svg
                    className="w-8 fill-white"
                    viewBox="0 0 513 513">
                    <path d="M480.436 178.682C473.782 104.112 420.545 50 353.812 50C314.803 50 278.7 68.3618 255.025 98.6839C231.762 68.0433 196.896 50 158.337 50C91.8294 50 38.6869 103.794 31.7699 177.971C31.0573 182.781 29.314 199.945 35.6317 226.823C45.0424 266.56 66.693 302.648 98.4476 331.379L243.085 458.339C246.61 461.446 251.052 463 255.457 463C259.843 463 264.248 461.465 267.773 458.396L414.865 330.256C436.572 307.645 466.583 272.307 476.593 226.506C482.986 197.232 480.586 179.468 480.436 178.682Z" />
                </svg>
                <p className="text-white -mt-1">{post._count.likes}</p>
            </div>
        </div>
    )
}

export default Posts