const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// create, read, update, and delete
// user 
// project 
// task 
// section


//All User related methods

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
  const deletedUser = await prisma.user.delete({
    where: userId
  })
  console.log(deletedUser)
  await prisma.$disconnect()
}

//method for updating a user
export async function updateUser(userId: object, updatedInfo: object) {
  const updatedUser = await prisma.user.update({
    where: userId,
    data: updatedInfo
  })
  console.log(updatedUser)
  await prisma.$disconnect()
}

//method for reading a user
// to be implemented


export default {createUser, deleteUser, updateUser, /* readUser*/};