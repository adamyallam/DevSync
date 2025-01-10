import prisma from '@/db/prisma'

// function for creating a task
export async function createTask(projectId: number, sectionId: number) {
  try {
    const task = await prisma.task.create({
      data: {
        project: {
          connect: { id: projectId },
        },
        section: {
          connect: { id: sectionId },
        },
      },
    });

    console.log('Task created:', task);

    return task;
  } catch (error) {
    console.error("Error in createTask function:", error);
    throw new Error("Failed to create task in database.");
  }
}

// function for deleting a task
export async function deleteTask(taskId: {id: number}) {
  const deletedtask = await prisma.task.delete({
    where: taskId
  })
  console.log("Task was deleted!", deletedtask)
}

//function for updating a task
export async function updateTask(taskId: {id: number}, fieldsToUpdate: object) {
  const updatedTask = await prisma.task.update({
    where: taskId,
    data: fieldsToUpdate
  })
  console.log("Task's info was updated!", updatedTask)
  return updatedTask
}

//function for reading a task
export async function readTask(id: number) {
  const task = await prisma.task.findUnique({
    where: { id }
  })
  if (task == null) {
    console.log("No user found!")
  } else {
    console.log("User was read!", task)
  }
}

//function for reading all tasks
export async function readAllTasks() {
  const tasks = await prisma.task.findMany()
  console.log("All tasks were read!", tasks)
}


export default { createTask, deleteTask, updateTask, readTask, readAllTasks };