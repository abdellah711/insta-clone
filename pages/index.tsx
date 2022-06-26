import type { GetServerSideProps, NextPage } from 'next'
import prisma from 'lib/prisma'
import { objectToJSON } from 'utils/serialize'
import Post, { PostWithUser } from 'components/Post/Post'
import { getSession } from 'next-auth/react'

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className='max-w-[800px] mx-auto mt-20 flex gap-5 justify-center px-2'>
      <div className='basis-[450px]'>
        {posts?.map(post => (<Post post={post} key={post.id} />))}
      </div>
      {/* <div className='flex-1 hidden bg-gray-400 self-start h-16 sticky top-20 lg:block'>
      </div> */}
    </div>
  )
}

interface Props {
  posts: PostWithUser[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/auth/login', permanent: false } }

  const user = await prisma.user.findUnique({ where: { id: +session.user.id! } })
  if (!user?.username) return { redirect: { destination: '/auth/fb', permanent: false } }

  const posts = await prisma.post.findMany({
    include: {
      owner: { select: { fullname: true, username: true, image: true, id: true } },
      _count: true,
      likes: { where: { userId: user.id } }
    }
  })

  return {
    props: {
      posts: objectToJSON(posts)
    }
  }
}

export default Home
