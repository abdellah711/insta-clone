import type { GetServerSideProps, NextPage } from "next"
import prisma from "lib/prisma"
import { getSession } from "next-auth/react"
import Profile from "components/Profile"
import { objectToJSON } from "utils/serialize"
import { PostWithUser } from "types/post"
import { UserProfile } from "types/user"

const profile: NextPage<Props> = ({ user, posts }) => {
    return (
        <div className="mt-20">
            <Profile user={user} posts={posts} />
        </div>
    )
}


interface Props {
    user: UserProfile,
    posts: PostWithUser[],

}


export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { id } = ctx.query
    if (!id) return { redirect: { destination: '/', permanent: false } }

    const session = await getSession(ctx)

    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            _count: { select: { followers: true, following: true, posts: true } },
            followers: { where: { followerId: +session?.user.id! }, select: { followerId: true } },
            posts: {
                include: {
                    _count: { select: { likes: true } },
                    owner: {
                        select: { fullname: true, username: true, image: true, id: true }
                    },
                    likes: {where: {userId: +session?.user.id!}}
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if (!user) return { redirect: { destination: '/', permanent: false } }
    const { password, fId, posts, ...rest } = user
    return {
        props: {
            user: rest,
            posts: objectToJSON(posts)
        }
    }
}

export default profile