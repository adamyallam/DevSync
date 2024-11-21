import { NextRequest, NextResponse } from "next/server"
import { createProject, deleteProject, updateProject, readProject, readAllProjects } from "src/db/db-connections/project"
import authOptions from "../auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'

//API to READ a project (invokes "readProject")
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const id = parseInt(searchParams.get('id') ?? '-1')
  const session = await getServerSession(authOptions)

  if (session) {
    if (id !== -1) {
      try {
        readProject(id)
        return NextResponse.json(
          { message: `project READ!` },
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
        readAllProjects()
        return NextResponse.json(
          { message: `all projects READ!` },
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

//API to add or "POST" a project (invokes "createProject")
export const POST = async (req: Request) => {
  const { name, description, dueDate } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const userId = session.id
      const projectData = { name, description, dueDate };

      const newProject = await createProject(userId, projectData);

      return NextResponse.json(
        { message: 'New project created!', project: newProject },
        { status: 201 }
      );
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
    );
  }
}

//API to DELETE a project (invokes "deleteProject")
export const DELETE = async (req: Request) => {
  const { id } = await req.json();
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      const projectId = { id }
      deleteProject(projectId)
      return NextResponse.json(
        { message: `project ${id} Deleted!` },
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

//API to UPDATE a project (invokes "updateProject")
export const PATCH = async (req: Request) => {
  const { id, name, description } = await req.json();
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      const projectId = { id }
      const updatedInfo = { name, description }
      updateProject(projectId, updatedInfo)
      return NextResponse.json(
        { message: `project ${id} updated!` },
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
















