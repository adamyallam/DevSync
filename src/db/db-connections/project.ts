const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


// function for creating a project
export async function createProject(userId: number, projectData: { name: string, description: string, dueDate: string, defaultView?: string }) {
  try {
    const project = await prisma.project.create({
      data: {
        ...projectData,
        ownerID: userId,
        sections: {
          create: {
            name: "Default Section",
            description: 'This is your first section',
          } 
        }
      },
      include: { sections: true }
    });

    console.log("New project was created:", project);
    return project;
  } catch (error) {
    console.error("Error in createProject function:", error);
    throw new Error("Failed to create project in database.");
  } finally {
    await prisma.$disconnect();
  }
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
export async function updateProject(projectId: { id: number }, fieldsToUpdate: object) {
  const updatedProject = await prisma.project.update({
    where: projectId,
    data: fieldsToUpdate,
  });
  console.log("Project's info was updated!", updatedProject);
  await prisma.$disconnect()

  return updatedProject;
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
export async function readAllProjects(id: number) {
  const projects = await prisma.project.findMany({
    where: {
      ownerID: id
    },
    include: {
      sections: true
    }
  });
  console.log("All projects were read!", projects)
  await prisma.$disconnect()
  return projects
}

export default { createProject, deleteProject, updateProject, readProject, readAllProjects };