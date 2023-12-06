const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// method for creating a task
export async function createTask(taskData: object) {
    const task = await prisma.task.create({
        data: taskData
      })
      console.log(task)
      // await prisma.task.deleteMany();
      await prisma.$disconnect()
}

// method for deleting a task
export async function deleteTask(taskId: object) {
  const deletedtask = await prisma.task.delete({
    where: taskId
  })
  console.log(deletedtask)
  await prisma.$disconnect()
}

//method for updating a task
export async function updateTask(taskId: object, updatedInfo: object) {
  const updatedtask = await prisma.task.update({
    where: taskId,
    data: updatedInfo
  })
  console.log(updatedtask)
  await prisma.$disconnect()
}

//method for reading a task
// to be implemented


export default {createTask, deleteTask, updateTask /* readUser*/};