import Product from "../../../domain/entities/Product";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ProductRepository from "../../../domain/repositories/ProductRepository";


export default class GetProductUseCase {

  constructor(private productRepository: ProductRepository) { }
  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product;
  }
}