import SearchIcon from 'public/assets/icons/search.svg'
import CancelIcon from 'public/assets/icons/red-x.svg'
import { ChangeEventHandler, useEffect, useState } from 'react'
import SearchResult from './SearchResult'
import { UserPublicInfo } from 'types/user'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [data, setData] = useState<UserPublicInfo[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => { setSearchQuery(e.currentTarget.value) }

    const handleClear = () => {
        setSearchQuery('')
        setIsFocused(false)

    }

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

    return (
        <form className="bg-stone-200/60 rounded-lg px-3 relative" onSubmit={e => e.preventDefault()} onFocus={() => setIsFocused(true)}>
            <label className='flex relative peer'>
                <SearchIcon className="stroke-gray-700 w-5" />
                <input
                    className="outline-none py-2 pl-2 pr-5 bg-transparent placeholder:text-gray-500 placeholder:font-light"
                    value={searchQuery}
                    onChange={handleChange}
                    type="text" name="search" aria-label="Search input" placeholder="Search" />
            </label>
            <CancelIcon
                className={"absolute right-2 top-1/2 -translate-y-1/2 w-5 cursor-pointer fill-gray-400 " + (isFocused ? 'block' : 'hidden')}
                onClick={handleClear}
            />
            {isFocused &&
                <>
                    <SearchResult data={data} loading={loading} error={error} onItemClick={handleClear} />
                    <div className='fixed inset-0 z-[-1]' onClick={() => setIsFocused(false)} />
                </>
            }

        </form>
    )
}

export default Search