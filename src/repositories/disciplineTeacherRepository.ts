import { prisma } from "../connection.js";

async function getIdByDisciplineAndTeacher(disciplineId: number, teacherId: number) {
  const disciplineTeacher = await prisma.disciplineTeacher.findFirst({
    where: {
      disciplineId,
      teacherId
    }
  });

  return disciplineTeacher?.id;
}

export default { getIdByDisciplineAndTeacher };