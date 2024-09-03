import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface RequestOptions {
  params: {
    id: string
  }
};

export async function GET(request: NextRequest, { params: { id } }: RequestOptions) {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });

  if(!user) {
    return NextResponse.json({ error: 'User not found'}, { status: 404 });
  } else {
    return NextResponse.json(user);
  }
}

export async function PUT(request: NextRequest, { params: { id } }: RequestOptions) {
  //validate request body
  const body = await request.json();

  // if invalid, return 400
  const validation = schema.safeParse(body);
  if(!validation.success)
    return NextResponse.json(validation.error.errors, { status: 401 });
  
  // else fetch the user with the given id
  const existingUser = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  // if doesn't exist return 404
  if(!existingUser)  // emulating searching for user
    return NextResponse.json({ error: 'User was not found' }, { status: 404 });

  // else update the user 
  const updatedUser = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      name: body.name,
      email: body.email
    }
  });

  // return the updated user
  return NextResponse.json(updatedUser);
};

export async function DELETE(request: NextRequest, { params: { id } }: RequestOptions) {
  // fetch user with given id
  const existingUser = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  // if user is not found return 404
  if(!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // else delete user from db
  // return response 
  const deletedUser = await prisma.user.delete({
    where: {
      id: id
    }
  });

  return NextResponse.json(deletedUser);
}