import { NextRequest, NextResponse } from "next/server"
import { createTask, deleteTask, updateTask, readTask, readAllTasks } from "src/db/db-connections/task"
import authOptions from "../auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'


//API to add or "POST" a task (invokes "createTask")
export const POST = async (req: Request) => {
  const { projectID, sectionID } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate task creation for demo users
        const mockTask = {
          id: `demo-task-id-${Date.now()}`,
          projectID,
          sectionID,
          userId: session.id,
          name: "",
          description: "This is a demo task",
          status: "SetStatus",
          priority: "SetPriority",
          completed: false,
          dueDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return NextResponse.json(
          { message: 'Demo task created!', task: mockTask },
          { status: 201 }
        );
      }
      const task = await createTask(projectID, sectionID);

      return NextResponse.json(
        { message: 'New task created!', task: task },
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

//API to DELETE a task (invokes "deleteTask")
export const DELETE = async (req: Request) => {
  const { id } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      if (session.isDemo) {
        // Simulate task deletion for demo users
        return NextResponse.json(
          { message: `Demo task ${id} deleted!` },
          { status: 200 }
        );
      }
      const taskId = { id };
      await deleteTask(taskId);
      return NextResponse.json(
        { message: `Task ${id} Deleted!` },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to DELETE', err },
      { status: 500 }
    );
  }
}

//API to UPDATE a task (invokes "updateTask")
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
        // Simulate task update for demo users
        const mockUpdatedTask = { id, ...fieldsToUpdate };
        return NextResponse.json(
          { message: `Demo task ${id} updated!`, task: mockUpdatedTask },
          { status: 200 }
        );
      }
      const updatedTask = await updateTask({ id }, fieldsToUpdate);
      return NextResponse.json(
        { message: `Task ${id} updated!`, task: updatedTask },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to UPDATE', err },
      { status: 500 }
    );
  }
}

//API to READ a task (invokes "readtask")
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const id = parseInt(searchParams.get('id') ?? '-1')
  const session = await getServerSession(authOptions)

  if (session) {
    if (id !== -1) {
      try {
        readTask(id)
        return NextResponse.json(
          { message: `task READ!` },
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
        readAllTasks()
        return NextResponse.json(
          { message: `all users READ!` },
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