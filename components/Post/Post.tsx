import type { Like, Post, User } from "@prisma/client"
import { formatRelative } from "utils/relative-time";
import { FC, useState } from "react"
import LikeBtn from "./LikeBtn";
import Link from "next/link";
import MenuIcon from 'public/assets/icons/3dots.svg'


export type PostWithUser = (Post & {
    _count: { likes: number };
    owner: Pick<User, "fullname" | "username" | "image" | "id">;
    likes: Like[];
})

interface Props {
    post: PostWithUser
}

const Post: FC<Props> = ({ post }) => {
    const [content, setContent] = useState(post.content.split('\n')[0].split(' ').slice(0, 10).join(' '))

    const handleShowMore = () => setContent(post.content)

    return (
        <article className="max-w-md border border-gray-300 pb-2 rounded mb-6 bg-white">
            <header className="p-2 flex">
                <Link href={'/profile/' + post.owner.id}>
                    <a className="flex gap-3 items-center cursor-pointer flex-1">
                        <img
                            className="w-11 aspect-square overflow-hidden rounded-full border border-gray-400"
                            src={post.owner.image ?? '/assets/images/default-profile.png'}
                        />
                        <div>
                            <p className="font-semibold">{post.owner.username}</p>
                            <p className="text-sm text-gray-500">{post.owner.fullname}</p>
                        </div>
                    </a>
                </Link>
                <button className="fill-gray-600 p-1">
                    <MenuIcon className="w-5" />
                </button>
            </header>
            <img src={post.image} className="w-full" />
            <div className="flex items-center gap-3 pt-2 px-2">
                <LikeBtn isLiked={post.likes?.length > 0} likesCount={post._count.likes} postId={post.id} />
            </div>
            <p className="p-2">
                <span className="font-semibold">{post.owner.username} </span>
                {content}
                {content.length !== post.content.length
                    && (<>...<span className="text-gray-400 cursor-pointer" onClick={handleShowMore}>more</span></>)}
            </p>
            <p className="uppercase text-xs text-gray-500 p-2">{formatRelative(post.createdAt)}</p>
        </article>
    )
}


export default Post