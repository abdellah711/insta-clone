const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')


const client = new PrismaClient();

const users = [
    {
        user: {
            email: 'testtest@gmail.com',
            fullname: 'Test test',
            username: 'testtest',
            password: bcrypt.hashSync('testtest', bcrypt.genSaltSync())
        },
        posts: [
            {
                content: "Hello world",
                image: "/assets/images/test/post1.jpg",
            },
            {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, exercitationem dolorum! Corporis non id, sint rem voluptatem in est eveniet magni earum vel incidunt eum exercitationem ducimus, consequuntur cum recusandae nam! Facere, reprehenderit atque numquam necessitatibus assumenda quasi voluptates temporibus facilis ut sed praesentium architecto doloremque, modi nam ratione cupiditate saepe eius consectetur, molestiae quisquam sit exercitationem porro. Corporis quia iste aspernatur et odio fuga odit minima earum, molestias est ex nulla ratione commodi totam magnam soluta nesciunt repellendus! Cumque enim nisi iusto, sint blanditiis atque, tempore excepturi unde expedita omnis fuga eos repudiandae tempora commodi labore veritatis incidunt dolore!",
                image: "/assets/images/test/post2.jpg",
            },
            {
                content: "Hello world 2",
                image: "/assets/images/test/post2.jpg",
            },
        ]
    },
    {
        user: {
            email: 'user@gmail.com',
            fullname: 'someone somebody',
            username: 'someone',
            password: bcrypt.hashSync('testtest', bcrypt.genSaltSync())
        },
        posts: [
            {
                content: "Hello world",
                image: "/assets/images/test/post2.jpg",
            },
            {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, exercitationem dolorum! Corporis non id, sint rem voluptatem in est eveniet magni earum vel incidunt eum exercitationem ducimus, consequuntur cum recusandae nam! Facere, reprehenderit atque numquam necessitatibus assumenda quasi voluptates temporibus facilis ut sed praesentium architecto doloremque, modi nam ratione cupiditate saepe eius consectetur, molestiae quisquam sit exercitationem porro. Corporis quia iste aspernatur et odio fuga odit minima earum, molestias est ex nulla ratione commodi totam magnam soluta nesciunt repellendus! Cumque enim nisi iusto, sint blanditiis atque, tempore excepturi unde expedita omnis fuga eos repudiandae tempora commodi labore veritatis incidunt dolore!",
                image: "/assets/images/test/post3.jpg",
            },
        ]
    },
    {
        user: {
            email: 'alaoui@gmail.com',
            fullname: 'alaoui alaoui',
            username: 'alaoui',
            password: bcrypt.hashSync('testtest', bcrypt.genSaltSync())
        },
        posts: [
            {
                content: "Hello world",
                image: "/assets/images/test/post2.jpg",
            },
            {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, exercitationem dolorum! Corporis non id, sint rem voluptatem in est eveniet magni earum vel incidunt eum exercitationem ducimus, consequuntur cum recusandae nam! Facere, reprehenderit atque numquam necessitatibus assumenda quasi voluptates temporibus facilis ut sed praesentium architecto doloremque, modi nam ratione cupiditate saepe eius consectetur, molestiae quisquam sit exercitationem porro. Corporis quia iste aspernatur et odio fuga odit minima earum, molestias est ex nulla ratione commodi totam magnam soluta nesciunt repellendus! Cumque enim nisi iusto, sint blanditiis atque, tempore excepturi unde expedita omnis fuga eos repudiandae tempora commodi labore veritatis incidunt dolore!",
                image: "/assets/images/test/post3.jpg",
            },
        ]
    }

]

const main = async () => {
    await Promise.all(users.map(async (data) => {
        const user = await client.user.create({
            data: data.user
        })
        await Promise.all(data.posts.map(async post => {
            await client.post.create({
                data: {
                    userId: user.id,
                    ...post
                }
            })
        }))
    }))

    console.log('test data created successfully')
}

try {
    main()
    console.log("seeding finished successfully")
} catch (err) {
    console.log('Error with seeding', err)
} finally {
    client.$disconnect()
}