import prisma from '@/db/prisma'

//All User related functions

// function for creating a user
async function createUser(userData: { firstName: string, lastName: string, username: string, email: string, password: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        ...userData
      },
    });

    console.log('User created:', user);
    return user;
  } catch (err) {
    console.error("Error in createProject function:", err);
    throw new Error("Failed to create project in database.");
  }
}

// function for deleting a user
async function deleteUser(userId: { id: number }) {
  const deletedUser = await prisma.user.delete({
    where: userId
  })
  console.log(`User was deleted!`, deletedUser)
}

//function for updating a user
async function updateUser(userId: { id: number }, updatedInfo: object) {
  const updatedUser = await prisma.user.update({
    where: userId,
    data: updatedInfo
  })
  console.log("User's info was updated!", updatedUser)
}

//function for reading one user
async function readUser(id: number) {
  const user = await prisma.user.findUnique({
    where: { id }
  })
  if (user == null) {
    console.log("No user found!")
  } else {
    console.log("User was read!", user)
  }
}

//function for reading all users
async function readAllUsers() {
  const users = await prisma.user.findMany()
  console.log("All users were read!", users)
}


export { createUser, deleteUser, updateUser, readUser, readAllUsers };