const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
export const db = prisma

//All User related functions

// function for creating a user
export async function createUser(userData: object) {
    const user = await prisma.user.create({
        data: userData
      })
      console.log("New user created!", user)
      // await prisma.user.deleteMany();
      await prisma.$disconnect()
}

// function for deleting a user
export async function deleteUser(userId: object) {
  const deletedUser = await prisma.user.delete({
    where: userId
  })
  console.log(`User was deleted!`, deletedUser)
  await prisma.$disconnect()
}

//function for updating a user
export async function updateUser(userId: object, updatedInfo: object) {
  const updatedUser = await prisma.user.update({
    where: userId,
    data: updatedInfo
  })
  console.log("User's info was updated!", updatedUser)
  await prisma.$disconnect()
}

//function for reading one user
export async function readUser(id: number) {
  const user = await prisma.user.findUnique({
    where: { id }
  })
  if (user == null) {
    console.log("No user found!")
  } else {
    console.log("User was read!", user)
  }
  await prisma.$disconnect()
}

//function for reading all users
export async function readAllUsers() {
  const users = await prisma.user.findMany()
  console.log("All users were read!", users)
  await prisma.$disconnect()
}


export default {createUser, deleteUser, updateUser, readUser, readAllUsers};