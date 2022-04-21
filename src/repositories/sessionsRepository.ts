import { Session } from "@prisma/client";
import { connection } from "../connection.js";

export type CreateSessionData = Omit<Session, "id">;

async function create(data: CreateSessionData) {
  const session = await connection.session.create({
    data: data,
  });
  return session;
}

async function findById(sessionId: number) {
  const session = await connection.session.findUnique({
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
