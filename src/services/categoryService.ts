import categoryRepository from "../repositories/categoryRepository.js";

async function getCategories() {
  const categories = await categoryRepository.findAll();

  return categories;
}

export default { getCategories };
