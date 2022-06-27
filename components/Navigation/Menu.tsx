import { signOut } from "next-auth/react";
import Link from "next/link"

import { FC } from "react"

interface Props {
    onClose?: () => void;
}

const Menu: FC<Props> = ({ onClose }) => {
    const itemClasses = 'whitespace-nowrap p-2 hover:bg-gray-600/10 rounded text-start'
    return (
        <>
            <div className="fixed inset-0" onClick={() => onClose?.()} />
            <div className="absolute mt-3 right-1 border shadow-md min-w-[400px] rounded bg-white flex flex-col gap-1 p-1">
                <Link href="/profile">
                    <a className={itemClasses}>Profile</a>
                </Link>
                <hr />

                <button className={itemClasses} onClick={()=> signOut()}>Log out</button>


                {/* top triangle */}
                <div className="absolute right-2 top-0 -mt-3 overflow-hidden h-3 w-6">
                    <div className="rotate-45 w-4 h-4 bg-white translate-x-1 translate-y-1 border border-gray-200" />
                </div>
            </div>
        </>
    )
}

export default Menu