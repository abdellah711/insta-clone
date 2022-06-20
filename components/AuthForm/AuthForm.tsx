import Image from 'next/image'
import { FC, FormEventHandler, ReactNode } from 'react'
import FB from '../../public/assets/icons/facebook.svg'

interface Props {
    children: ReactNode[];
    onSubmit: FormEventHandler;
    disabled?: boolean;
    submitTxt: string;
    error?: string | null
}

const AuthForm: FC<Props> = ({ children, onSubmit, disabled = false, submitTxt, error }) => {
    return (
        <div className='px-5 py-12 border border-gray-400 rounded-sm bg-white'>

            <form className='flex flex-col gap-3' onSubmit={onSubmit}>
                <div className='mx-auto'>
                    <Image src={'/assets/images/logo.png'} width={175} height={51} layout="fixed" alt='instagram logo' />
                </div>
                {error && <p className="text-red-500 border border-red-500 py-2 px-3 rounded-sm bg-red-50">{error}</p>}
                {children}
                <button disabled={disabled} className='bg-blue-500 text-white p-2 text-lg mt-3 rounded-sm transition duration-200 hover:bg-blue-600 disabled:bg-blue-300'>{submitTxt}</button>
            </form>

            <p className='flex items-center text-gray-400 my-5'>
                <span className='flex-1 h-[1.5px] bg-gray-300' />
                <span className='px-4'>OR</span>
                <span className='flex-1 h-[1.5px] bg-gray-300' />
            </p>
            <button className='flex items-center justify-center w-full gap-2 text-sky-800'><FB className='w-9' /> Login with Facebook</button>
        </div>
    )
}

export default AuthForm