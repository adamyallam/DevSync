import { NextRequest, NextResponse } from "next/server"
import { createSection, deleteSection, updateSection, readSection, readAllSections } from "src/db/db-connections/section"
import authOptions from "../auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'


//API to add or "POST" a section (invokes "createsection")
export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions)
  const { projectId } = await req.json()

  try {
    if (session) {
      const newSection = await createSection(projectId)

      return NextResponse.json(
        { message: 'New section created!', section: newSection },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to POST', err },
      { status: 500 }
    )
  }
}

//API to DELETE a section (invokes "deletesection")
export const DELETE = async (req: Request) => {
  const { id } = await req.json();
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      const sectionId = { id }
      deleteSection(sectionId)
      return NextResponse.json(
        { message: `section ${id} Deleted!` },
        { status: 201 }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to DELETE', err },
      { status: 500 }
    )
  }
}

//API to UPDATE a section (invokes "updatesection")
export const PATCH = async (req: Request) => {
  const { id, name, description } = await req.json();
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      const sectionId = { id }
      const updatedInfo = { name, description }
      updateSection(sectionId, updatedInfo)
      return NextResponse.json(
        { message: `section ${id} updated!` },
        { status: 201 }
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