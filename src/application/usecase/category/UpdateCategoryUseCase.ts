import Category from "../../../domain/entities/Category";
import BadRequestError from "../../../domain/exceptions/BadRequestError";
import ConflictError from "../../../domain/exceptions/ConflictError";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import CategoryRepository from "../../../domain/repositories/CategoryRepository";



export default class UpdateCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }

  async execute(categoryUpdate: { id: string, name: string }): Promise<Category> {
    const { id, name } = categoryUpdate
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundError('Category not found')
    }
    const category_name = await this.categoryRepository.findByName(name)
    if (category_name) {
      throw new ConflictError('Category name already registered')
    }
    const updateCategory = {
      id: id,
      name: name
    }
    return await this.categoryRepository.update(updateCategory)

  }
}