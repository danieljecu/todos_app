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

async function clearUserRefreshToken(userId: number) {
  //TODO why is not working?

  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      // refreshToken: null,
    },
  });
}
async function setUserRefreshToken(userId: number, refreshToken: string) {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      // refreshToken: refreshToken,
    },
  });
}

export {
  getUserById,
  getUserByEmail,
  createNewUser,
  clearUserRefreshToken,
  setUserRefreshToken,
};
