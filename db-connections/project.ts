const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


// function for creating a project
export async function createProject(projectData: object) {
    const project = await prisma.project.create({
        data: projectData
      })
      console.log("New project was created!", project)
      // await prisma.project.deleteMany();
      await prisma.$disconnect()
  }

// function for deleting a project
  export async function deleteProject(projectId: object) {
    const deletedProject = await prisma.project.delete({
      where: projectId
    })
    console.log("Project was deleted!", deletedProject)
    await prisma.$disconnect()
  }


//function for updating a project
export async function updateProject(projectId: object, updatedInfo: object) {
  const updatedProject = await prisma.project.update({
    where: projectId,
    data: updatedInfo
  })
  console.log("Project's info was updated!", updatedProject)
  await prisma.$disconnect()
}


//function for reading one project
export async function readProject(id: number) {
  const project = await prisma.project.findUnique({
    where: { id }
  })
  if (project == null) {
    console.log("No user found!")
  } else {
    console.log("Project was read!", project)
  }
  await prisma.$disconnect()
}

//function for reading all projects
export async function readAllProjects() {
  const projects = await prisma.project.findMany()
  console.log("All projects were read!", projects)
  await prisma.$disconnect()
}

  export default {createProject, deleteProject, updateProject, readProject, readAllProjects};