import disciplineRepository from "../repositories/disciplineRepository.js";

async function getDisciplines() {
  const disciplines = await disciplineRepository.findAll();
  return disciplines;
}

export default { getDisciplines };
