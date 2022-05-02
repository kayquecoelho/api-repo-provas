import { prisma } from "../connection.js";

async function findAll() {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      disciplineTeacher: {
        select: {
          discipline: {
            select: {
              id: true,
              name: true,
              term: true,
            },
          },
          tests: {
            orderBy: [{ categoryId: "asc" }, { viewsCount: "desc" }],
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              category: true,
              viewsCount: true,
            },
          },
        },
      },
    },
    orderBy: { name: "asc" }
  });

  return teachers;
}

async function findByDiscipline(disciplineId: number) {
  const result = prisma.teacher.findMany({
    where: {
      disciplineTeacher: {
        some: {
          disciplineId
        }
      }
    },
  });
  
  return result;
}

export default { findAll, findByDiscipline};
