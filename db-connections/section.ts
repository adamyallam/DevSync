const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// function for creating a section
export async function createSection(sectionData: object) {
    const section = await prisma.section.create({
        data: sectionData
      })
      console.log("New section was created!", section)
      // await prisma.section.deleteMany();
      await prisma.$disconnect()
}

// function for deleting a section
export async function deleteSection(sectionId: object) {
  const deletedsection = await prisma.section.delete({
    where: sectionId
  })
  console.log("Section was deleted!", deletedsection)
  await prisma.$disconnect()
}

//function for updating a section
export async function updateSection(sectionId: object, updatedInfo: object) {
  const updatedsection = await prisma.section.update({
    where: sectionId,
    data: updatedInfo
  })
  console.log("Section's info was updated!",updatedsection)
  await prisma.$disconnect()
}

//function for reading a section
export async function readSection(id: number) {
  const section = await prisma.section.findUnique({
    where: { id }
  })
  if (section == null) {
    console.log("No section found!")
  } else {
    console.log("section was read!", section)
  }
  await prisma.$disconnect()
}

//function for reading all sections
export async function readAllSections() {
  const sections = await prisma.section.findMany()
  console.log("All sections were read!", sections)
  await prisma.$disconnect()
}


export default {createSection, deleteSection, updateSection, readSection, readAllSections};