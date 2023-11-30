const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// create, read, update, and delete
// user 
// project 
// task 
// section



// method for creating a user
export async function createUser(userData: object) {
    const user = await prisma.user.create({
        data: userData
      })
      console.log(user)
      // await prisma.user.deleteMany();
      await prisma.$disconnect()
}

// method for deleting a user
export async function deleteUser(userId: object) {
  const user = await prisma.user.delete({
    where: userId
  })
  console.log(user)
  await prisma.$disconnect()
}

export default {createUser, deleteUser};