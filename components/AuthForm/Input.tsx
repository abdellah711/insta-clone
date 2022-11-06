import React, { FC, InputHTMLAttributes } from 'react'
import XIcon from 'public/assets/icons/red-x.svg'

const Input: FC<InputHTMLAttributes<HTMLInputElement> & { error?: boolean }> = ({ placeholder, error, ...rest }) => {
    return (
        <div className="relative">
            <label className='relative group'>
                <input {...rest} className="peer rounded border border-gray-400 p-2 pt-3 w-full" required placeholder=' ' />
                <span className='absolute grid place-items-center top-0 left-0 bottom-0 capitalize text-gray-500 mx-2  origin-top-left transition duration-100 scale-75 -translate-y-2 -mt-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'>{placeholder}</span>
            </label>
            {error && <XIcon className="w-7 fill-red-400 absolute top-1/2 right-2 -translate-y-1/2" />}
        </div>
    )
}

export default Input