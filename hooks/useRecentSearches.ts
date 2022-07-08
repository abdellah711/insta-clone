import { useState } from "react"
import { UserPublicInfo } from "types/user"

const useRecentSearches = () => {
    const [recentSearches, setRecentSearches] = useState<UserPublicInfo[]>(() => JSON.parse(localStorage.getItem('recent') ?? "[]"))

    const add = (user: UserPublicInfo) => {
        const newRecents = [user, ...recentSearches.filter(u => u.id !== user.id)].slice(0, 5)
        localStorage.setItem('recent', JSON.stringify(newRecents))
        setRecentSearches(newRecents)
    }

    const remove = (user: UserPublicInfo) => {
        const newRecents = recentSearches.filter(u => u.id !== user.id)
        localStorage.setItem('recent', JSON.stringify(newRecents))
        setRecentSearches(newRecents)
    }

    const clear = () => {
        localStorage.setItem('recent', JSON.stringify([]))
        setRecentSearches([])
    }

    return {
        recentSearches,
        add,
        remove,
        clear
    }
}

export default useRecentSearches