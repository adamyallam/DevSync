import { NextRequest, NextResponse } from "next/server"
import { createProject, deleteProject, updateProject, readProject, readAllProjects } from "src/db/db-connections/project"
import authOptions from "../auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'

//API to READ a project (invokes "readProject")
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)

  if (session) {
    try {
      const projects = await readAllProjects(session.id)
      return NextResponse.json(
        { message: `all projects READ!`, projects },
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

//API to add or "POST" a project (invokes "createProject")
export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const { name, description, dueDate, defaultView } = await req.json();

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate project creation for demo users
        const mockProject = {
          id: `demo-project-id-${Date.now()}`,
          name,
          description,
          dueDate,
          status: "SetStatus",
          favorited: false,
          descriptionTitle: "Demo Overview",
          sections: [
            {
              id: `demo-section-id-${Date.now()}`,
              projectID: `demo-project-id-${Date.now()}`,
              userId: session.id,
              name: "Default Section",
              tasks: [],
              status: "SetStatus",
              dueDate: null,
              createdAt: new Date(),
            }
          ],
          tasks: [
            {
              id: `demo-task-id-${Date.now()}`,
              projectID: `demo-project-id-${Date.now()}`,
              sectionID: `demo-section-id-${Date.now()}`,
              userId: session.id,
              name: "Default Task",
              description: "This is a demo task",
              status: "SetStatus",
              priority: "SetPriority",
              completed: false,
              dueDate: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          ],
          defaultView: defaultView || 'list',
          userId: session.id
        };
        return NextResponse.json(
          { message: 'Demo project created!', project: mockProject },
          { status: 201 }
        );
      }
      const userId = session.id;
      const projectData = { name, description, dueDate, defaultView: defaultView || 'list' };

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
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    if (session.isDemo) {
      // Simulate project deletion for demo users
      return NextResponse.json(
        { message: `Demo project ${id} deleted!` },
        { status: 200 }
      );
    }

    const projectId = { id };
    await deleteProject(projectId);
    return NextResponse.json(
      { message: `Project ${id} Deleted!` },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json(
      { message: 'Failed to DELETE', err },
      { status: 500 }
    );
  }
};

//API to UPDATE a project (invokes "updateProject")
export const PATCH = async (req: Request) => {
  const { id, ...fieldsToUpdate } = await req.json();
  const session = await getServerSession(authOptions);

  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    return NextResponse.json(
      { message: 'ID and at least one field to update are required.' },
      { status: 400 }
    );
  }

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate project update for demo users
        const mockUpdatedProject = { id, ...fieldsToUpdate };
        return NextResponse.json(
          { message: `Demo project ${id} updated!`, project: mockUpdatedProject },
          { status: 200 }
        );
      }
      const updatedProject = await updateProject({ id }, fieldsToUpdate);
      return NextResponse.json(
        { message: `Project ${id} updated!`, project: updatedProject },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to UPDATE', error: err },
      { status: 500 }
    );
  }
}
















