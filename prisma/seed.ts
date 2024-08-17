import prisma from '@/prisma/prisma';
import { hash } from 'bcryptjs';

async function main() {
  const password = await hash('Azertyuiop12,', 10);
  const user = await prisma.users.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      firstname: 'Admin',
      password,
      status: 'particulier',
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
