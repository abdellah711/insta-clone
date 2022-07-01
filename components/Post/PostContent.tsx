import { FC, useState } from "react"
import { formatRelative } from "utils/relative-time";

interface Props {
    content: string;
    username: string | null;
    showMore?: boolean;
}

const PostContent: FC<Props> = ({ content: defaultContent, username, showMore = true }) => {
    const [content, setContent] = useState(showMore ? defaultContent.split('\n')[0].split(' ').slice(0, 10).join(' ') : defaultContent)

    const handleShowMore = () => setContent(defaultContent)

    return (
        <p className="p-2">
            <span className="font-semibold">{username} </span>
            {content}
            {content.length !== defaultContent.length
                && (<>...<span className="text-gray-400 cursor-pointer" onClick={handleShowMore}>more</span></>)}
        </p>

    )
}

export default PostContent