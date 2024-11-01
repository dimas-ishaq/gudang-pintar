import Product from "../../../domain/entities/Product";
import ProductRepository from "../../../domain/repositories/ProductRepository";





export default class GetInventoryUseCase {

  constructor(private productRepository: ProductRepository) { }
  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll()
  }
}