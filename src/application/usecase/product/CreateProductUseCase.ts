import Product from "../../../domain/entities/Product";
import ProductRepository from "../../../domain/repositories/ProductRepository";


export default class CreateProductUseCase {

  constructor(private productRepository: ProductRepository) { }
  async execute(product: Product): Promise<Product> {
    return await this.productRepository.create(product)
  }
}