import prisma from '@/db/prisma'

// function for creating a section
async function createSection(projectId: number) {
  try {
    const section = await prisma.section.create({
      data: {
        project: {
          connect: { id: projectId },
        },
      },
    });

    console.log('Section created:', section);
    return section;
  } catch (error) {
    console.error("Error in createSection function:", error);
    throw new Error("Failed to create section in database.");
  }
}

// function for deleting a section
async function deleteSection(sectionId: {id: number}) {
  const deletedsection = await prisma.section.delete({
    where: sectionId
  })
  console.log("Section was deleted!", deletedsection)
}

//function for updating a section
async function updateSection(sectionId: {id: number}, fieldsToUpdate: object) {
  const updatedsection = await prisma.section.update({
    where: sectionId,
    data: fieldsToUpdate
  })
  
  console.log("Section's info was updated!", updatedsection)
  return updatedsection
}

//function for reading a section
async function readSection(id: number) {
  const section = await prisma.section.findUnique({
    where: { id }
  })
  if (section == null) {
    console.log("No section found!")
  } else {
    console.log("section was read!", section)
  }
}

//function for reading all sections
async function readAllSections() {
  const sections = await prisma.section.findMany()
  console.log("All sections were read!", sections)
}


export { createSection, deleteSection, updateSection, readSection, readAllSections };