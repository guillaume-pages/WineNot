import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(_request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
      { status: 401 },
    );
  }

  const id = session?.user?.id;

  try {
    const userCellars = await prisma.users_cellars.findMany({
      where: {
        user_id: id,
      },
      include: {
        cellars: true,
      },
    });

    return NextResponse.json({
      authenticated: !!session,
      session: session,
      cellars: userCellars,
    });
  } catch (error) {
    console.error(error);
  }
}
