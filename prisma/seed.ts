import { prisma } from "../src/connection.js";
import { faker } from "@faker-js/faker";

function teacherFactory(id: number) {
  return { id, name: faker.name.firstName() };
}

async function seed() {
  await prisma.$executeRaw`
    TRUNCATE TABLE 
      terms, disciplines, "disciplinesTeachers", categories, tests, teachers, users, sessions
    RESTART IDENTITY`;

  await prisma.term.createMany({
    data: [
      { id: 1, number: 1 },
      { id: 2, number: 2 },
    ],
  });

  await prisma.category.createMany({
    data: [
      { id: 1, name: "P1" },
      { id: 2, name: "P2" },
    ],
  });

  const firstTeacherData = teacherFactory(1);
  const secondTeacherData = teacherFactory(2);

  await prisma.teacher.createMany({
    data: [firstTeacherData, secondTeacherData],
  });

  await prisma.discipline.createMany({
    data: [
      { id: 1, name: "CSS", termId: 1 },
      { id: 2, name: "JS", termId: 1 },
      { id: 3, name: "HTML", termId: 2 },
      { id: 4, name: "React", termId: 2 },
      { id: 5, name: "NodeJS", termId: 2 },
    ],
  });

  await prisma.disciplineTeacher.createMany({
    data: [
      { id: 1, disciplineId: 1, teacherId: 1 },
      { id: 2, disciplineId: 2, teacherId: 2 },
      { id: 3, disciplineId: 3, teacherId: 1 },
      { id: 4, disciplineId: 4, teacherId: 2 },
      { id: 5, disciplineId: 5, teacherId: 1 },
    ],
  });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
