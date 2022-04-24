import { connection } from "../connection.js";

export default async function findTerms(){
  const data = await connection.term.findMany({
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
                select: {
                  name: true,
                  pdfUrl: true,
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