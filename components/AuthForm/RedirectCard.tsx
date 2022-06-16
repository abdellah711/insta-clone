import Link from "next/link"
import { FC } from "react"

interface Props {
    login?: boolean
}

const RedirectCard: FC<Props> = ({ login = true }) => {
    return (
        <p className='p-3 bg-white border border-gray-400 rounded-sm mt-4 text-center '>
            {login ? 'Don\'t have an account?' : 'Have an account?'}
            <Link href={login ? '/auth/signup':'/auth/login'}>
                <a className="text-blue-500 pl-2">
                    {login ? 'Sign up': 'Login'}
                </a>
            </Link>
        </p>
    )
}

export default RedirectCard