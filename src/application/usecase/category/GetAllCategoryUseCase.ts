import Category from "../../../domain/entities/Category";
import CategoryRepository from "../../../domain/repositories/CategoryRepository";




export default class GetAllCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }
}