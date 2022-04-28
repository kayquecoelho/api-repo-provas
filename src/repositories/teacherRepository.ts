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
            orderBy: {
              id: "asc",
            },
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
  });

  return teachers;
}

export default { findAll };
