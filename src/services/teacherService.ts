import teacherRepository from "../repositories/teacherRepository.js";

async function getTeachersByDiscipline(disciplineId: number) {
  const teachers = teacherRepository.findByDiscipline(disciplineId);

  return teachers;
}

export default { getTeachersByDiscipline };