import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession(authOptions);

  if(!session) 
    return NextResponse.json({ error: 'You do not have access'}, { status: 401 });
  
  const existingUser = await prisma.user.findUnique({
    where: {
      email: session.user!.email as string
    }
  });

  if(!existingUser) 
    return NextResponse.json({ error: 'User does not exist' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      hashedPassword
    }
  });

  return NextResponse.json(updatedUser);
}