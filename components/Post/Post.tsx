import { FC } from "react"
import LikeBtn from "./LikeBtn";
import { PostWithUser } from "types/post";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostTime from "./PostTime";


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
            <PostTime time={post.createdAt}/>
        </article>
    )
}


export default Post