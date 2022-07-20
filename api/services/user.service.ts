import { prisma } from "../utils/db_client";

async function getUserByEmail(email: string) {
  //TODO: ?? don't know why i can't use findUnique here
  return await prisma.users.findFirst({
    where: {
      email: email,
      // email: email ? { equals: String(email) } : undefined,
    },
  });
}

async function getUserById(id: number) {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
}

async function createNewUser({
  username,
  email,
  hashPassword,
}: {
  username: string;
  email: string;
  hashPassword: string;
}) {
  return await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: hashPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });
}

export { getUserById, getUserByEmail, createNewUser };
