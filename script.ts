const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// create, read, update, and delete
// user 
// project 
// task 
// section



// method for creating a user when someone signs-up
export default async function createUser(userData: object) {
    const user = await prisma.user.create({
        data: userData
      })
      console.log(user)
      await prisma.user.deleteMany();
      await prisma.$disconnect()
}

// method for deleting a user when going to 'delete user' page
// export async function deleteUser() {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: 1 //get users id
//     }
//   })

// }
