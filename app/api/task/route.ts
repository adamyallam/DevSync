import { NextResponse } from "next/server"
import { createTask, deleteTask, updateTask /* readtask */} from "../../../db-connections/task"

//API to add or "POST" a task (invokes "createtask")
export const POST = async (req: Request) => {
    const { name, description, comments } = await req.json();
    
    try {
        const taskData = { name, description, comments}
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
// TO BE CREATED