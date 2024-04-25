import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: Request) {
  try {
    const { firstname, email, password } = (await req.json()) as {
      firstname: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.users.create({
      data: {
        firstname,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        firstname: user.firstname,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
