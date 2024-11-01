import Category from "../../../domain/entities/Category";
import CategoryRepository from "../../../domain/repositories/CategoryRepository";




export default class GetCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }
  async execute(id: string): Promise<Category> {
    return await this.categoryRepository.findById(id)
  }
}