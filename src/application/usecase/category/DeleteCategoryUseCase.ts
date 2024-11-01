import NotFoundError from "../../../domain/exceptions/NotFoundError";
import CategoryRepository from "../../../domain/repositories/CategoryRepository";


export default class DeleteCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundError('Category not found')
    }
    await this.categoryRepository.delete(id)
  }
}