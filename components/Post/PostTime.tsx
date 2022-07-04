import { FC, useEffect, useState } from "react"
import { formatRelative } from "utils/relative-time"

interface Props {
    time: string | Date
}

const PostTime: FC<Props> = ({ time: defaultTime }) => {
    const [time, setTime] = useState<typeof defaultTime>(new Date())

    useEffect(() => {
        setTime(defaultTime)
    }, [])

    return (
        <p className="uppercase text-xs text-gray-500 p-2">{formatRelative(time)}</p>
    )
}

export default PostTime