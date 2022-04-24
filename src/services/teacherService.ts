import * as teacherRepository from "../repositories/teacherRepository.js";

export async function getTeachers() {
  const teachers = await teacherRepository.findAll();
  
  return teachers;
}