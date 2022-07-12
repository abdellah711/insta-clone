import { FC } from "react"
import Link from "next/link"
import Image from 'next/image'
import DefaultImage from 'public/assets/images/default-profile.png'
import Suggestion from './Suggestion'
import { signOut } from "next-auth/react"
import { UserPublicInfo } from "types/user"


interface Props {
  user: UserPublicInfo,
  suggestions: UserPublicInfo[]
}

const Sidebar: FC<Props> = ({ user, suggestions }) => {
  return (
    <aside className='flex-1 hidden self-start sticky top-20 lg:block'>
      <div className='flex mb-5 mt-2'>
        <Link href={'/profile/' + user.id}>
          <a className='flex items-center gap-4 flex-1 group'>
            <div className='overflow-hidden rounded-full w-fit aspect-square'>
              <Image src={user.image ?? DefaultImage} width={60} height={60} />
            </div>
            <div className='flex flex-col'>
              <h2 className='font-medium group-active:text-gray-600 leading-5'>{user.username}</h2>
              <p className='capitalize text-gray-500 font-normal'>{user.fullname}</p>
            </div>
          </a>
        </Link>
        <button className='text-blue-500' onClick={() => signOut()}>Log out</button>
      </div>
      {suggestions?.length > 0 && (
        <div role="suggestions">
          <h2 className='text-gray-700/70 mb-4'>Suggestions for you</h2>
          {suggestions?.map(user => (<Suggestion user={user} key={user.id} />))}
        </div>
      )}
    </aside>
  )
}

export default Sidebar
