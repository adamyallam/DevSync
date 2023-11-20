const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// create, read, update, and delete
// user 
// project 
// task 
// section

async function main() {
    // const user = await prisma.user.create({
    //     data: {
    //       firstName: 'testFirst',
    //       lastName: 'testLast',
    //       username: 'testername',
    //       email: 'test@sample.com',
    //       password: 'faketestpassword'
    //     },
    //   })
    //   console.log(user)
    //   await prisma.user.deleteMany();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })