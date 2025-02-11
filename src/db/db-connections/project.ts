import prisma from '@/db/prisma'

// function for creating a project
async function createProject(userId: number, projectData: { name: string, description: string, dueDate: string, defaultView?: string }) {
  try {
    const project = await prisma.project.create({
      data: {
        ...projectData,
        owner: {
          connect: { id: userId },
        },
      },
    });

    const section = await prisma.section.create({
      data: {
        name: "Default Section",
        description: "This is the first section of the project.",
        project: {
          connect: { id: project.id },
        },
      },
    });

    const task = await prisma.task.create({
      data: {
        name: "Default Task",
        description: "This is the first task of the section.",
        project: {
          connect: { id: project.id },
        },
        section: {
          connect: { id: section.id },
        },
      },
    });

    const projectWithRelations = await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        sections: {
          include: {
            tasks: true,
          },
        },
        tasks: true,
      },
    });

    console.log("Project created:", projectWithRelations);
    return projectWithRelations
  } catch (error) {
    console.error("Error in createProject function:", error);
    throw new Error("Failed to create project in database.");
  }
}

// function for deleting a project
async function deleteProject(projectId: { id: number }) {
  const deletedProject = await prisma.project.delete({
    where: projectId
  })
  console.log("Project was deleted!", deletedProject)
}


//function for updating a project
async function updateProject(projectId: { id: number }, fieldsToUpdate: object) {
  const updatedProject = await prisma.project.update({
    where: projectId,
    data: fieldsToUpdate,
  });
  console.log("Project's info was updated!", updatedProject);

  return updatedProject;
}


//function for reading one project
async function readProject(id: number) {
  const project = await prisma.project.findUnique({
    where: { id }
  })
  if (project == null) {
    console.log("No user found!")
  } else {
    console.log("Project was read!", project)
  }
}

//function for reading all projects
async function readAllProjects(id: number) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerID: id
      },
      include: {
        sections: true,
        tasks: true
      }
    });
    console.log("All projects were read!", projects)
    return projects
  } catch (err) {
    console.error("Error in readAllProjects function:", err);
    throw new Error("Failed to read projects in database.");
  }
}

export { createProject, deleteProject, updateProject, readProject, readAllProjects };