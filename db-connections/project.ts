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

  export default {createProject, deleteProject};