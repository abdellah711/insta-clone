import type { GetServerSideProps, NextPage } from 'next'
import { objectToJSON } from 'utils/serialize'
import { getSession } from 'next-auth/react'
import { getPosts, getSuggestions, getUser } from 'services'
import { PostsList } from 'components/Post'
import { PostWithUser } from 'types/post'
import Sidebar from 'components/Sidebar/Sidebar'
import { UserPublicInfo } from 'types/user'


const Home: NextPage<Props> = ({ posts, suggestions, user }) => {
  return (
    <div className='max-w-4xl mx-auto mt-20 flex gap-7 justify-center px-2'>
      <div className='basis-[450px]'>
        <PostsList posts={posts} />
      </div>
      <Sidebar suggestions={suggestions} user={user} />
    </div>
  )
}


interface Props {
  posts: PostWithUser[]
  suggestions: UserPublicInfo[]
  user: UserPublicInfo
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
