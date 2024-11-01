import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ProductRepository from "../../../domain/repositories/ProductRepository";


export default class DeleteProductUseCase {

  constructor(private productRepository: ProductRepository) { }
  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    await this.productRepository.delete(id)
  }
}