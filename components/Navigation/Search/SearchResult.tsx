import { FC, ReactNode } from "react"
import { UserPublicInfo } from "types/user"
import SearchItem from "./SearchItem"

interface Props {
    data: UserPublicInfo[] | null,
    loading: boolean,
    error: boolean,
    onItemClick: () => void;
}

const SearchResult: FC<Props> = ({ loading, data, error, onItemClick }) => {

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

    return (
        <SearchResultContainer>

            {data ?
                /* Search Result */
                (data.length > 0 ? <ul className="overflow-auto flex-1 max-h-full list-none">
                    {data.map(user => (<SearchItem key={user.id} user={user} onClick={onItemClick} />))}
                </ul>
                    :
                    <Empty text="No result" />
                )
                :
                /* Recent */
                <div className="flex flex-col max-h-full">
                    <div className="flex justify-between py-2 px-4">
                        <h2 className="font-semibold">Recent</h2>
                        <button className="text-blue-500">Clear all</button>
                    </div>
                    <ul className="overflow-auto list-none">

                    </ul>
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
        <div className="h-full grid place-items-center">
            <p className="text-gray-600">{text}</p>
        </div>
    )
}


export default SearchResult