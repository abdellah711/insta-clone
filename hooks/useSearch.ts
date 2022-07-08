import { useEffect, useState } from "react"
import { UserPublicInfo } from "types/user"

const useSearch = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [data, setData] = useState<UserPublicInfo[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (searchQuery.length === 0) {
            setError(false)
            setLoading(false)
            setData(null)
            return
        }

        setLoading(true)
        setError(false)
        setData(null)
        const controller = new AbortController()
        const fetchResult = async () => {
            try {
                const resp = await fetch(`/api/users?search=${searchQuery}`, { signal: controller.signal })
                if (resp?.ok) {
                    const { data } = await resp.json()
                    setData(data)
                    setLoading(false)
                    return
                }
                setError(true)
                setLoading(false)

            } catch (err) {
                console.error(err)
                setError(true)
                setLoading(false)
            }
        }

        const id = setTimeout(fetchResult, 500)

        return () => {
            clearTimeout(id)
            controller.abort()
        }

    }, [searchQuery])


    const clear = () => {
        setSearchQuery('')
        setIsFocused(false)
    }

    const blur = () => setIsFocused(false)
    const focus = () => setIsFocused(true)

    return {
        searchQuery,
        setSearchQuery,
        loading,
        isFocused,
        data,
        error,
        clear,
        blur,
        focus
    }
}

export default useSearch