import { prisma } from "../connection.js";

export default async function findTerms(){
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
                orderBy: {
                  id: 'asc'
                },
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
      id: "asc",
    },
  });
  return data;
}