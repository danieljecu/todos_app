import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const prismaAsAny = prisma as any;

export { prisma, prismaAsAny };
