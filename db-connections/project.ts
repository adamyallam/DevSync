const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


// method for creating a project
export async function createProject(projectData: object) {
    const project = await prisma.project.create({
        data: projectData
      })
      console.log(projectData)
      // await prisma.project.deleteMany();
      await prisma.$disconnect()
  }

// method for deleting a project
  export async function deleteProject(projectId: object) {
    const deletedProject = await prisma.project.delete({
      where: projectId
    })
    console.log(deletedProject)
    await prisma.$disconnect()
  }


//method for updating a project
export async function updateProject(projectId: object, updatedInfo: object) {
  const updatedProject = await prisma.project.update({
    where: projectId,
    data: updatedInfo
  })
  console.log(updatedProject)
  await prisma.$disconnect()
}

//API to READ a task (invokes "readTask")
// TO BE CREATED

  export default {createProject, deleteProject, updateProject /** readTask */};