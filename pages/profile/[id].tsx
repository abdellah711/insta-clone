import Header from "components/Profile/Header"
import type { GetServerSideProps, NextPage } from "next"
import prisma from "lib/prisma"
import { User } from "@prisma/client"
import { getSession } from "next-auth/react"

const profile: NextPage<Props> = ({ user }) => {
    return (
        <div className="mt-20">
            <div className="max-w-4xl mx-auto">
                <Header user={user} />
            </div>
        </div>
    )
}


interface Props {
    user: Omit<User, 'password' | 'fId'> & {
        followers: {
            followerId: number;
        }[];
        _count: {
            followers: number;
            following: number;
            posts: number;
        };
    };
}


export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { id } = ctx.query
    if (!id) return { redirect: { destination: '/', permanent: false } }

    const session = await getSession(ctx)

    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            _count: { select: { followers: true, following: true, posts: true } },
            followers: { where: { followerId: +session?.user.id! }, select: { followerId: true } }
        }
    })

    if (!user) return { redirect: { destination: '/', permanent: false } }
    const { password, fId, ...rest } = user
    return {
        props: {
            user: rest
        }
    }
}

export default profile