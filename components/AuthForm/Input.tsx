import React, { FC, InputHTMLAttributes } from 'react'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ placeholder, ...rest }) => {
    return (
        <label className='relative group'>
            <input {...rest} className="peer rounded-sm border border-gray-400 p-2 pt-3 w-full" required/>
            <span className='absolute grid place-items-center top-0 left-0 bottom-0 -mt-1 capitalize text-gray-500 mx-2  origin-top-left transition duration-100 group-focus-within:scale-75 group-focus-within:-translate-y-2 peer-valid:scale-75 group-focus-within:mt-0 peer-valid:mt-0 peer-valid:-translate-y-2'>{placeholder}</span>
        </label>
    )
}

export default Input