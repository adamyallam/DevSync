import prisma from '@/db/prisma'

//All User related functions

// function for creating a user
export async function createUser(userData: {firstName: string, lastName: string, username: string, email: string, password: string}) {
  const user = await prisma.user.create({
    data: {
      ...userData,
      projects: {
        create: {
          name: "Default Project",
          description: "This is your first project",
          dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          sections: {
            create: {
              name: "Default Section",
              description: 'This is your first section',
            } // We'll add this part below
          }
        }
      }
    },
    include: { projects: { include: { sections: true } } }
  });

  console.log("New user created with project and added to members!", user);
}

// function for deleting a user
export async function deleteUser(userId: {id: number}) {
  const deletedUser = await prisma.user.delete({
    where: userId
  })
  console.log(`User was deleted!`, deletedUser)
}

//function for updating a user
export async function updateUser(userId: {id: number}, updatedInfo: object) {
  const updatedUser = await prisma.user.update({
    where: userId,
    data: updatedInfo
  })
  console.log("User's info was updated!", updatedUser)
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
}

//function for reading all users
export async function readAllUsers() {
  const users = await prisma.user.findMany()
  console.log("All users were read!", users)
}


export default { createUser, deleteUser, updateUser, readUser, readAllUsers };