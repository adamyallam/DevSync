const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// function for creating a task
export async function createTask(taskData: object) {
    const task = await prisma.task.create({
        data: taskData
      })
      console.log("New task created!", task)
      // await prisma.task.deleteMany();
      await prisma.$disconnect()
}

// function for deleting a task
export async function deleteTask(taskId: object) {
  const deletedtask = await prisma.task.delete({
    where: taskId
  })
  console.log("Task was deleted!", deletedtask)
  await prisma.$disconnect()
}

//function for updating a task
export async function updateTask(taskId: object, updatedInfo: object) {
  const updatedtask = await prisma.task.update({
    where: taskId,
    data: updatedInfo
  })
  console.log("Task's info was updated!", updatedtask)
  await prisma.$disconnect()
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
  await prisma.$disconnect()
}

//function for reading all tasks
export async function readAllTasks() {
  const tasks = await prisma.task.findMany()
  console.log("All tasks were read!", tasks)
  await prisma.$disconnect()
}


export default {createTask, deleteTask, updateTask, readTask, readAllTasks};