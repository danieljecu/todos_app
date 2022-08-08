import { prisma } from "./db_client";
import Logger from "./logger"

// More hooks/utils will be added in the future and this could
// lead to confusing imports if there is a default
// eslint-disable-next-line import/prefer-default-export
export { prisma, Logger };
