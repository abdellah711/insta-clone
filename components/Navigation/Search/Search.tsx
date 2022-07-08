import SearchIcon from 'public/assets/icons/search.svg'
import CancelIcon from 'public/assets/icons/red-x.svg'
import { ChangeEventHandler } from 'react'
import SearchResult from './SearchResult'
import useSearch from 'hooks/useSearch'

const Search = () => {

    const {
        searchQuery,
        data,
        loading,
        error,
        isFocused,
        setSearchQuery,
        clear,
        focus,
        blur
    } = useSearch()

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => { setSearchQuery(e.currentTarget.value) }



    return (
        <form className="bg-stone-200/60 rounded-lg px-3 relative" onSubmit={e => e.preventDefault()} onFocus={focus}>
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
                onClick={clear}
            />
            {isFocused &&
                <>
                    <SearchResult data={data} loading={loading} error={error} onItemClick={clear} />
                    <div className='fixed inset-0 z-[-1]' onClick={blur} />
                </>
            }

        </form>
    )
}

export default Search