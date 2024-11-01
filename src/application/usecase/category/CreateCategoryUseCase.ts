import Category from "../../../domain/entities/Category";
import ConflictError from "../../../domain/exceptions/ConflictError";
import CategoryRepository from "../../../domain/repositories/CategoryRepository";



export default class CreateCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }
  async execute(category: Category): Promise<Category> {
    const isCategoryExists = await this.categoryRepository.findByName(category.name)
    if (isCategoryExists) {
      throw new ConflictError('Category name already exists')
    }
    return await this.categoryRepository.create(category)
  }
}