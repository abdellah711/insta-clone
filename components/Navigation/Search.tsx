import SearchIcon from 'public/assets/icons/search.svg'
import CancelIcon from 'public/assets/icons/red-x.svg'
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => setSearchQuery(e.currentTarget.value)
    const handleClear: MouseEventHandler = () => {
        setSearchQuery('')
        inputRef.current?.blur()
        console.log('clear')
    }


    return (
        <form className="bg-stone-200/60 overflow-hidden rounded-lg px-3 relative">
            <label className='flex relative peer'>
                <SearchIcon className="stroke-gray-700 w-5" />
                <input
                    className="outline-none py-2 pl-2 pr-5 bg-transparent placeholder:text-gray-500 placeholder:font-light"
                    ref={inputRef}
                    value={searchQuery}
                    onChange={handleChange}
                    type="text" name="search" aria-label="Search input" placeholder="Search" />
            </label>
            <CancelIcon
                className={
                    "absolute hidden right-2 top-1/2 -translate-y-1/2 w-5 cursor-pointer fill-gray-400 peer-focus-within:block "
                    + (searchQuery.length > 0 ? 'peer-hover:block' : '')
                }
                onClick={handleClear}
            />

        </form>
    )
}

export default Search