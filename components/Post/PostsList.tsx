import { FC } from "react"
import { PostWithUser } from "types/post";
import Post from "./Post";

interface Props {
    posts: PostWithUser[];
}

const PostsList: FC<Props> = ({ posts }) => {
    return (
        <>
            {posts?.length > 0 ?
                posts.map(post => (<Post post={post} key={post.id} />))
                :
                <div className="w-full text-center flex flex-col h-[60vh] justify-center">
                    <h1 className="text-xl mb-3">No Posts</h1>
                    <p className="text-gray-500">Follow some people to get posts here</p>
                </div>
                }
        </>
    )
}

export default PostsList