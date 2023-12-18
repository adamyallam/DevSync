import { NextRequest, NextResponse } from "next/server"
import { createTask, deleteTask, updateTask, readTask, readAllTasks} from "../../../db-connections/task"

//API to add or "POST" a task (invokes "createtask")
export const POST = async (req: Request) => {
    const { projectID, sectionID, name, description, comments, dueDate} = await req.json();
    
    try {
        const taskData = { projectID, sectionID, name, description, comments, dueDate}
        createTask(taskData)
        return NextResponse.json(
            { message: 'New task created!' },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to POST', err}, 
            { status: 500 }
        )
    }
}

//API to DELETE a task (invokes "deletetask")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();
    
    try {
        const taskId = { id }
        deleteTask(taskId)
        return NextResponse.json(
            { message: `task ${id} Deleted!` },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to DELETE', err}, 
            { status: 500 }
        )
    }
}

//API to UPDATE a task (invokes "updatetask")
export const PATCH = async (req: Request) => { 
    const { id, name, description} = await req.json();
    
    try {
        const taskId = { id }
        const updatedInfo = {  name, description }
        updateTask(taskId, updatedInfo)
        return NextResponse.json(
            { message: `task ${id} updated!` },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to UPDATE', err}, 
            { status: 500 }
        )
    }
}

//API to READ a task (invokes "readtask")
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const id = parseInt(searchParams.get('id') ?? '-1')

    if(id !== -1){    
        try {
            readTask(id)
            return NextResponse.json(
                { message: `task READ!` },
                { status: 201 }
            )
            } catch (err) {
            return NextResponse.json(
                { message: 'Failed to READ', err}, 
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
                { message: 'Failed to READ', err}, 
                { status: 500 }
            )
        }
    }
}