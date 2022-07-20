import { prisma } from "../utils/db_client";
import * as bcrypt from "bcryptjs";

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

export { clearUserRefreshToken, setUserRefreshToken };
