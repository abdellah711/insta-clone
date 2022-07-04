const { PrismaClient } = require("@prisma/client");


const client = new PrismaClient();


const main = async () => {
    await Promise.all([client.post.deleteMany(),client.like.deleteMany(),client.follows.deleteMany()])
    await client.user.deleteMany()
}

try {
    main()
} catch (err) {
    console.error(err)
} finally {
    client.$disconnect()
}