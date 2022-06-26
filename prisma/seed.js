const { PrismaClient } = require("@prisma/client");
const bcrypt =  require('bcrypt')


const client = new PrismaClient();

const main = async () => {
    const user = await client.user.create({
        data: {
            email: 'testtest@gmail.com',
            fullname: 'Test test',
            username: 'testtest',
            password: bcrypt.hashSync('testtest', bcrypt.genSaltSync())
        }
    })

    console.log('test user created successfully')
    
    await client.post.create({
        data: {
            userId: user.id,
            content: "Hello world",
            image: "https://via.placeholder.com/600x600",
        }
    })
    
    console.log('test post created successfully')
}

try {
    main()
    console.log("seeding finished successfully")
} catch (err) {
    console.log('Error with seeding', err)
} finally {
    client.$disconnect()
}