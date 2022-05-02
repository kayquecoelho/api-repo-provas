import { prisma } from "../connection.js";

async function findAll() {
  const data = await prisma.term.findMany({
    select: {
      number: true,
      id: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          classes: {
            select: {
              teacher: {
                select: {
                  name: true,
                },
              },
              tests: {
                orderBy: [{ categoryId: "asc" }, { viewsCount: "desc" }],
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  viewsCount: true,
                  category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      number: "asc",
    },
  });
  return data;
}

export default { findAll };
