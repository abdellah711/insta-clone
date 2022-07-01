import prisma from "lib/prisma";



export const getPosts = async (userId: number) => {
    const followings = await prisma.user.findMany({
        where: {
            followers: {
                some: {
                    followerId: userId
                }
            }
        },
        select: {
            id: true
        }
    })

    return await prisma.post.findMany({
        include: {
            owner: { select: { fullname: true, username: true, image: true, id: true } },
            _count: true,
            likes: { where: { userId } }
        },
        where: {
            userId: {
                in: [...followings.map(({ id }) => id), userId]
            }
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
}

export const getSuggestions = (userId: number) => {
    return prisma.user.findMany({
        take: 5,
        include: {
            followers: {
                where: {
                    followerId: userId
                }
            }
        }, where: {
            id: {
                not: userId
            },
            followers: {
                none: {
                    followerId: userId
                }
            }
        }
    })
}