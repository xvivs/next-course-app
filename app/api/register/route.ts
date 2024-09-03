import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import bcrypt from 'bcrypt';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(5)
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  // if email/password is incorrect
  if(!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  
  // if such user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  });

  if(existingUser) {
    return NextResponse.json({ error: 'User with given email already exist'}, { status: 400 });
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // creating new user
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      hashedPassword
    }
  });

  return NextResponse.json({ email: newUser.email });
}