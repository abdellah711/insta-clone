import type { Like, Post, User } from "@prisma/client"
import { formatRelative } from "utils/relative-time";
import { FC, useState } from "react"
import LikeBtn from "./LikeBtn";
import Link from "next/link";

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
            <header className="p-2">
                <Link href={'/profile/' + post.owner.id}>
                    <a className="flex gap-3 items-center cursor-pointer">
                        <img
                            className="w-10 rounded-full border border-gray-400"
                            src={post.owner.image ?? '/assets/images/default-profile.png'}
                        />
                        {post.owner.fullname}
                    </a>
                </Link>
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