import { FC } from "react"
import Modal from "./Modal"
import { LikeBtn, Post, PostContent, PostHeader } from '../Post'
import { PostWithUser } from "types/post"
import Image from "next/image";
import { formatRelative } from "utils/relative-time";
import PostTime from "components/Post/PostTime";

interface Props {
    post?: PostWithUser | null;
    onClose: () => void;
}

const PostDetailsModal: FC<Props> = ({ post, onClose }) => {
    return post ? (
        <Modal style={{ maxWidth: '64rem', borderRadius: '.25rem' }} onClose={onClose}>
            <div className="flex flex-wrap">
                <div className="relative flex-1 bg-black h-[60vh] sm:h-[80vh] basis-72">
                    <Image src={post.image} layout="fill" objectFit="contain" />
                </div>
                <div className="flex-1 basis-48 flex flex-col sm:h-[80vh] relative gap-2 pb-2">
                    <PostHeader owner={post.owner} />
                    <div className="hidden sm:block overflow-auto no-scrollbar" >
                        <PostContent username={post.owner.username} content={post.content} showMore={false}/>
                    </div>
                    <LikeBtn likesCount={post._count.likes} isLiked={post.likes.length > 0} postId={post.id} />
                    <PostTime time={post.createdAt}/>
                </div>
            </div>
        </Modal>
    ) : null
}

export default PostDetailsModal