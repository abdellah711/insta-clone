import type { GetServerSideProps, NextPage } from 'next'
import prisma from 'lib/prisma'
import { objectToJSON } from 'utils/serialize'
import type { PostWithUser } from 'components/Post/Post'
import { getSession } from 'next-auth/react'
import { User as IUser } from '@prisma/client'
import User from 'components/User'
import { getPosts, getSuggestions } from 'services'
import { PostsList } from 'components/Post'

const Home: NextPage<Props> = ({ posts, suggestions }) => {
  return (
    <div className='max-w-4xl mx-auto mt-20 flex gap-7 justify-center px-2'>
      <div className='basis-[450px]'>
        <PostsList posts={posts} />
      </div>
      <div className='flex-1 hidden self-start sticky top-20 lg:block'>
        <h2 className='text-gray-500 mb-4'>Suggestions for you</h2>
        {suggestions?.map(user => (<User user={user} />))}
      </div>
    </div>
  )
}


interface Props {
  posts: PostWithUser[]
  suggestions: IUser[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/auth/login', permanent: false } }

  const user = await prisma.user.findUnique({ where: { id: +session.user.id! } })
  if (!user?.username) return { redirect: { destination: '/auth/fb', permanent: false } }

  const [posts, suggestions] = await Promise.all([
    getPosts(user.id),
    getSuggestions(user.id)
  ])


  return {
    props: {
      posts: objectToJSON(posts),
      suggestions: objectToJSON(suggestions)
    }
  }
}

export default Home
