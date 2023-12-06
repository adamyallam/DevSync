import { NextResponse } from "next/server"
import { createSection, deleteSection, updateSection, /* readsection */} from "../../../db-connections/section"


//API to add or "POST" a section (invokes "createsection")
export const POST = async (req: Request) => {
    const { name, description } = await req.json();
    
    try {
        const sectionData = { name, description }
        createSection(sectionData)
        return NextResponse.json(
            { message: 'New section created!' },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to POST', err}, 
            { status: 500 }
        )
    }
}

//API to DELETE a section (invokes "deletesection")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();
    
    try {
        const sectionId = { id }
        deleteSection(sectionId)
        return NextResponse.json(
            { message: `section ${id} Deleted!` },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to DELETE', err}, 
            { status: 500 }
        )
    }
}

//API to UPDATE a section (invokes "updatesection")
export const PATCH = async (req: Request) => { 
    const { id, name, description  } = await req.json();
    
    try {
        const sectionId = { id }
        const updatedInfo = { name, description  }
        updateSection(sectionId, updatedInfo)
        return NextResponse.json(
            { message: `section ${id} updated!` },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to UPDATE', err}, 
            { status: 500 }
        )
    }
}

//API to READ a section (invokes "readsection")
// TO BE CREATED