import findTerms from "../repositories/termsRepository.js";

export async function getTerms() {
  const data = await findTerms();
  
  return data;
}