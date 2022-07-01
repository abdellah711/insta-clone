import { FC, useState } from "react"

type Props = {
    isLiked: boolean;
    likesCount: number;
    postId: number;
}

const LikeBtn: FC<Props> = ({ isLiked: defaultLike, likesCount: defaultCount, postId }) => {
    const [isLiked, setIsLiked] = useState(defaultLike)
    const [likesCount, setLikesCount] = useState(defaultCount)

    const handleLike = async () => {
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
        setIsLiked(!isLiked)
        fetch(`/api/posts/${postId}/like`)
    }

    return (
        <div className="flex items-center gap-3 pt-2 px-2">
            <button onClick={handleLike}>
                <svg
                    className={"w-8 cursor-pointer " + (isLiked ? "stroke-red-500 fill-red-500" : "fill-transparent stroke-black")}
                    role="button"
                    viewBox="0 0 513 513" strokeWidth="20">
                    <path d="M480.436 178.682C473.782 104.112 420.545 50 353.812 50C314.803 50 278.7 68.3618 255.025 98.6839C231.762 68.0433 196.896 50 158.337 50C91.8294 50 38.6869 103.794 31.7699 177.971C31.0573 182.781 29.314 199.945 35.6317 226.823C45.0424 266.56 66.693 302.648 98.4476 331.379L243.085 458.339C246.61 461.446 251.052 463 255.457 463C259.843 463 264.248 461.465 267.773 458.396L414.865 330.256C436.572 307.645 466.583 272.307 476.593 226.506C482.986 197.232 480.586 179.468 480.436 178.682Z" />
                </svg>
            </button>
            <p className="font-semibold">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</p>
        </div>
    )
}

export default LikeBtn