import type { GetServerSideProps, NextPage } from 'next'
import prisma from 'lib/prisma'
import { objectToJSON } from 'utils/serialize'
import { getSession, signOut } from 'next-auth/react'
import { User as IUser } from '@prisma/client'
import User from 'components/User'
import { getPosts, getSuggestions, getUser } from 'services'
import { PostsList } from 'components/Post'
import { PostWithUser } from 'types/post'
import Image from 'next/image'
import DefaultImage from 'public/assets/images/default-profile.png'
import Link from 'next/link'


const Home: NextPage<Props> = ({ posts, suggestions, user }) => {
  return (
    <div className='max-w-4xl mx-auto mt-20 flex gap-7 justify-center px-2'>
      <div className='basis-[450px]'>
        <PostsList posts={posts} />
      </div>
      <div className='flex-1 hidden self-start sticky top-20 lg:block'>
        <div className='flex mb-5 mt-2'>
          <Link href={'/profile/'+user.id}>
            <a className='flex items-center gap-4 flex-1 group'>
              <div className='overflow-hidden rounded-full w-fit aspect-square'>
                <Image src={user.image ?? DefaultImage} width={60} height={60} />
              </div>
              <div className='flex flex-col'>
                <h2 className='font-medium group-active:text-gray-600'>{user.username}</h2>
                <p className='capitalize text-gray-500 font-normal'>{user.fullname}</p>
              </div>
            </a>
          </Link>
          <button className='text-blue-500' onClick={()=> signOut()}>Log out</button>
        </div>
        <div role="suggestions">
          <h2 className='text-gray-700/70 mb-4'>Suggestions for you</h2>
          {suggestions?.map(user => (<User user={user} key={user.id} />))}
        </div>
      </div>
    </div>
  )
}


interface Props {
  posts: PostWithUser[]
  suggestions: IUser[]
  user: IUser
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) return { redirect: { destination: '/auth/login', permanent: false } }
  const user = await getUser(+session.user.id!)

  if (!user) return { redirect: { destination: '/auth/logout', permanent: false } }
  if (!user.username) return { redirect: { destination: '/auth/fb', permanent: false } }

  const [posts, suggestions] = await Promise.all([
    getPosts(user.id),
    getSuggestions(user.id)
  ])


  return {
    props: {
      posts: objectToJSON(posts),
      suggestions: objectToJSON(suggestions),
      user
    }
  }
}

export default Home
