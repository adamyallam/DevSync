const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// method for creating a section
export async function createSection(sectionData: object) {
    const section = await prisma.section.create({
        data: sectionData
      })
      console.log(section)
      // await prisma.section.deleteMany();
      await prisma.$disconnect()
}

// method for deleting a section
export async function deleteSection(sectionId: object) {
  const deletedsection = await prisma.section.delete({
    where: sectionId
  })
  console.log(deletedsection)
  await prisma.$disconnect()
}

//method for updating a section
export async function updateSection(sectionId: object, updatedInfo: object) {
  const updatedsection = await prisma.section.update({
    where: sectionId,
    data: updatedInfo
  })
  console.log(updatedsection)
  await prisma.$disconnect()
}

//method for reading a section
// to be implemented


export default {createSection, deleteSection, updateSection, /* readsection*/};