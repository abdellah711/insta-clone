import { Like, Post, Prisma, User } from "@prisma/client"
import { formatRelative } from "utils/relative-time";
import { FC, useState } from "react"
import LikeBtn from "./LikeBtn";

export type PostWithUser = (Post & {
    _count: Prisma.PostCountOutputType;
    owner: Pick<User, "fullname" | "username">;
    likes: Like[];
})

interface Props {
    post: PostWithUser
}

const Post: FC<Props> = ({ post }) => {


    return (
        <article className="max-w-md border border-gray-300 pb-2 rounded mb-6">
            <header className="p-2">{post.owner.fullname}</header>
            <img src={post.image} className="w-full"/>
            <div className="flex items-center gap-3 pt-2 px-2">
                <LikeBtn isLiked={post.likes?.length > 0} likesCount={post._count.likes} />
            </div>
            <p className="p-2">
                <span className="font-semibold">{post.owner.username} </span>
                {post.content}
            </p>
            <p className="uppercase text-xs text-gray-500 p-2">{formatRelative(post.createdAt)}</p>
        </article>
    )
}


export default Post