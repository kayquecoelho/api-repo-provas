import { Session } from "@prisma/client";
import { prisma } from "../connection.js";

export type CreateSessionData = Omit<Session, "id">;

async function create(data: CreateSessionData) {
  const session = await prisma.session.create({
    data: data,
  });
  return session;
}

async function findById(sessionId: number) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: true,
    },
  });
  return session;
}

export default {
  create,
  findById,
};
