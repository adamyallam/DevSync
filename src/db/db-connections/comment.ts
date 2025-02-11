// Code in case a comment feature wants to be added to the app

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// function for creating a comment
async function createComment(commentData: object) {
    const comment = await prisma.comment.create({
        data: commentData
      })
      console.log("New comment was created!", comment)
      // await prisma.comment.deleteMany();
      await prisma.$disconnect()
}

// function for deleting a comment
async function deleteComment(commentId: object) {
  const deletedComment = await prisma.comment.delete({
    where: commentId
  })
  console.log("Comment was deleted!", deletedComment)
  await prisma.$disconnect()
}

//function for updating a comment
async function updateComment(commentId: object, updatedInfo: object) {
  const updatedComment = await prisma.comment.update({
    where: commentId,
    data: updatedInfo
  })
  console.log("Comments info was updated!", updatedComment)
  await prisma.$disconnect()
}

//function for reading a comment
async function readComment(id: number) {
  const comment = await prisma.comment.findUnique({
    where: { id }
  })
  if (comment == null) {
    console.log("No comment found!")
  } else {
    console.log("Comment was read!", comment)
  }
  await prisma.$disconnect()
}

//function for reading all comments
async function readAllComments() {
  const comments = await prisma.comment.findMany()
  console.log("All comments were read!", comments)
  await prisma.$disconnect()
}


export {createComment, deleteComment, updateComment, readComment, readAllComments};