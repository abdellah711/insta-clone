import { formatRelative } from "utils/relative-time";
import { FC, useState } from "react"
import LikeBtn from "./LikeBtn";
import { PostWithUser } from "types/post";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";


interface Props {
    post: PostWithUser
}

const Post: FC<Props> = ({ post }) => {


    return (
        <article className="max-w-md border border-gray-300 pb-2 rounded mb-6 bg-white">
            <PostHeader owner={post.owner} />
            <img src={post.image} className="w-full" />
            <LikeBtn isLiked={post.likes?.length > 0} likesCount={post._count.likes} postId={post.id} />
            <PostContent username={post.owner.username} content={post.content} />
            <p className="uppercase text-xs text-gray-500 p-2">{formatRelative(post.createdAt)}</p>
        </article>
    )
}


export default Post