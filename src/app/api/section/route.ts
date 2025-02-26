import { NextRequest, NextResponse } from "next/server"
import { createSection, deleteSection, updateSection, readSection, readAllSections } from "src/db/db-connections/section"
import authOptions from "../auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'


//API to add or "POST" a section (invokes "createSection")
export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions)
  const { projectID } = await req.json()

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate section creation for demo users
        const mockSection = {
          id: `demo-section-id-${Date.now()}`,
          projectID,
          userId: session.id,
          name: "",
          tasks: [],
          status: "SetStatus",
          dueDate: null,
          createdAt: new Date(),
        }
        return NextResponse.json(
          { message: 'Demo section created!', section: mockSection },
          { status: 201 }
        )
      }
      const newSection = await createSection(projectID)

      return NextResponse.json(
        { message: 'New section created!', section: newSection },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to POST', err },
      { status: 500 }
    )
  }
}

//API to DELETE a section (invokes "deleteSection")
export const DELETE = async (req: Request) => {
  const { id } = await req.json()
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate section deletion for demo users
        return NextResponse.json(
          { message: `Demo section ${id} deleted!` },
          { status: 200 }
        )
      }
      const sectionId = { id }
      await deleteSection(sectionId)
      return NextResponse.json(
        { message: `Section ${id} Deleted!` },
        { status: 200 }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to DELETE', err },
      { status: 500 }
    )
  }
}

//API to UPDATE a section (invokes "updateSection")
export const PATCH = async (req: Request) => {
  const { id, ...fieldsToUpdate } = await req.json()
  const session = await getServerSession(authOptions)

  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    return NextResponse.json(
      { message: 'ID and at least one field to update are required.' },
      { status: 400 }
    )
  }

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate section update for demo users
        const mockUpdatedSection = { id, ...fieldsToUpdate }
        return NextResponse.json(
          { message: `Demo section ${id} updated!`, section: mockUpdatedSection },
          { status: 200 }
        )
      }
      const updatedSection = await updateSection({ id }, fieldsToUpdate)
      return NextResponse.json(
        { message: `Section ${id} updated!`, section: updatedSection },
        { status: 200 }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to UPDATE', err },
      { status: 500 }
    )
  }
}

//API to READ a section (invokes "readsection")
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const id = parseInt(searchParams.get('id') ?? '-1')
  const session = await getServerSession(authOptions)

  if (session) {
    if (id !== -1) {
      try {
        readSection(id)
        return NextResponse.json(
          { message: `section READ!` },
          { status: 201 }
        )
      } catch (err) {
        return NextResponse.json(
          { message: 'Failed to READ', err },
          { status: 500 }
        )
      }
    } else {
      try {
        readAllSections()
        return NextResponse.json(
          { message: `all sections READ!` },
          { status: 201 }
        )
      } catch (err) {
        return NextResponse.json(
          { message: 'Failed to READ', err },
          { status: 500 }
        )
      }
    }
  }
}