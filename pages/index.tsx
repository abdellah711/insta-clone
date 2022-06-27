import type { GetServerSideProps, NextPage } from 'next'
import prisma from 'lib/prisma'
import { objectToJSON } from 'utils/serialize'
import Post, { PostWithUser } from 'components/Post/Post'
import { getSession } from 'next-auth/react'
import { User as IUser } from '@prisma/client'
import User from 'components/User'
import { getPosts, getSuggestions } from 'services'

const Home: NextPage<Props> = ({ posts, suggestions }) => {
  return (
    <div className='max-w-[800px] mx-auto mt-20 flex gap-7 justify-center px-2'>
      <div className='basis-[450px]'>
        {posts?.map(post => (<Post post={post} key={post.id} />))}
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
