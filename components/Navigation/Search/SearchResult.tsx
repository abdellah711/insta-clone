import { FC, ReactNode, useEffect, useState } from "react"
import { UserPublicInfo } from "types/user"
import SearchItem from "./SearchItem"

interface Props {
    data: UserPublicInfo[] | null,
    loading: boolean,
    error: boolean,
    onItemClick: () => void;
}

const SearchResult: FC<Props> = ({ loading, data, error, onItemClick }) => {
    const [recentSearchs, setRecentSearchs] = useState<UserPublicInfo[]>(() => JSON.parse(localStorage.getItem('recent') ?? "[]"))




    if (loading) {
        return (
            <SearchResultContainer>
                <div className="h-full grid place-items-center">
                    <div className="border-2 border-gray-800 border-t-transparent rounded-full w-6 aspect-square animate-spin" />
                </div>
            </SearchResultContainer>
        )
    }

    if (error) {
        return (
            <SearchResultContainer>
                <Empty text="Something went wrong!" />
            </SearchResultContainer>
        )
    }

    const handleClick = (user: UserPublicInfo) => {
        const newRecents = [user, ...recentSearchs.filter(u => u.id !== user.id)].slice(0,5)
        localStorage.setItem('recent', JSON.stringify(newRecents))
        setRecentSearchs(newRecents)
        onItemClick()
    }
    
    const handleRecentRemove = (user: UserPublicInfo) => {
        const newRecents = recentSearchs.filter(u => u.id !== user.id)
        localStorage.setItem('recent', JSON.stringify(newRecents))
        setRecentSearchs(newRecents)
    }
    
    const handleClear = () => {
        localStorage.setItem('recent', JSON.stringify([]))
        setRecentSearchs([])
    }

    return (
        <SearchResultContainer>

            {data ?
                /* Search Result */
                (data.length > 0 ? <ul className="overflow-auto flex-1 max-h-full list-none">
                    {data.map(user => (<SearchItem key={user.id} user={user} onClick={() => handleClick(user)} />))}
                </ul>
                    :
                    <Empty text="No result" />
                )
                :
                /* Recent */
                <div className="flex flex-col h-full">
                    <div className="flex justify-between py-2 px-4">
                        <h2 className="font-semibold">Recent</h2>
                        {recentSearchs.length > 0 && <button className="text-blue-500" onClick={handleClear}>Clear all</button>}
                    </div>
                    {
                        recentSearchs.length > 0 ?
                            (<ul className="overflow-auto list-none">
                                {recentSearchs.map(user => <SearchItem key={user.id} user={user} onClick={onItemClick} onRemove={() => handleRecentRemove(user)} />)}
                            </ul>)
                            :
                            <Empty text="No recent searches" />
                    }
                </div>
            }





            {/* Top triangle */}
            <div className="absolute left-1/2 top-0 -mt-3 overflow-hidden h-3 w-6 -translate-x-1/2">
                <div className="rotate-45 w-4 h-4 bg-white translate-x-1 translate-y-1 border border-gray-200" />
            </div>
        </SearchResultContainer>
    )
}


const SearchResultContainer: FC<{ children: ReactNode[] | ReactNode }> = ({ children }) => {
    return (
        <div className='absolute top-14 left-1/2 -translate-x-1/2 w-[min(90vw,500px)] bg-white shadow-lg rounded-md border border-gray-200 h-[40vh]'
            aria-label="search result"
        >
            {children}
        </div>
    )
}


const Empty: FC<{ text: string }> = ({ text }) => {
    return (
        <div className="h-full grid place-items-center flex-1">
            <p className="text-gray-600">{text}</p>
        </div>
    )
}


export default SearchResult