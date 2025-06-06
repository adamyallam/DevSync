import { NextRequest, NextResponse } from "next/server"
import { createUser, deleteUser, updateUser, readUser, readAllUsers } from "src/db/db-connections/user"
import { hash } from 'bcrypt'
import authOptions from "../auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'
import prisma from "@/db/prisma"

//API to add or "POST" a user (invokes "createUser")
export const POST = async (req: NextRequest) => {

  const { firstName, lastName, username, email, password } = await req.json();
  const hashedPassword = await hash(password, 10);

  try {
      const userData = { firstName, lastName, username, email, password: hashedPassword };

      // Check if email already exists
      const existingEmail = await prisma.user.findUnique({
        where: { email }
      });
      if (existingEmail) {
        return NextResponse.json({ message: 'User with that email already exists!' }, { status: 409 });
      }

      // Check if username already exists
      const existingUsername = await prisma.user.findUnique({
        where: { username }
      });
      if (existingUsername) {
        return NextResponse.json({ message: 'User with that username already exists!' }, { status: 409 });
      }

      // Create the user with an associated project
      await createUser(userData);
      return NextResponse.json({ message: 'New user created with an initial project!' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to POST', err }, { status: 500 });
  }
};

//API to DELETE a user (invokes "deleteUser")
export const DELETE = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const { id } = await req.json();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const userId = { id }
    deleteUser(userId)
    return NextResponse.json(
      { message: `user ${id} Deleted!` },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to DELETE', err },
      { status: 500 }
    )
  }
}

//API to UPDATE a user (invokes "updateUser")
export const PATCH = async (req: Request) => {
  const { id, firstName, lastName, username, email, password } = await req.json();
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      const userId = { id }
      const updatedInfo = { firstName, lastName, username, email, password }

      // check if email already exists
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      if (existingEmail) {
        return NextResponse.json(
          { message: 'User with that email already exists!' },
          { status: 409 }
        )
      }
      // check if username already exists
      const existingUsername = await prisma.user.findUnique({
        where: {
          username: username
        }
      })
      if (existingUsername) {
        return NextResponse.json(
          { message: 'User with that username already exists!' },
          { status: 409 }
        )
      }

      updateUser(userId, updatedInfo)
      return NextResponse.json(
        { message: `user ${id} updated!` },
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

//API to READ a user (invokes "readUser")
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const id = parseInt(searchParams.get('id') ?? '-1')

  if (id !== -1) {
    try {
      readUser(id)
      return NextResponse.json(
        { message: `user READ!` },
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
      readAllUsers()
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











