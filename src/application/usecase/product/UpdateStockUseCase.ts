import BadRequestError from "../../../domain/exceptions/BadRequestError";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ProductRepository from "../../../domain/repositories/ProductRepository";


export default class UpdateStockUseCase {

  constructor(private productRepository: ProductRepository) { }

  async execute({ id, quantity }: { id: string, quantity: number }) {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`)
    }
    if (product.stock < quantity) {
      throw new BadRequestError("Insufficient stock available")
    }
    const updateStock = {
      id: id,
      stock: (product.stock - quantity)
    }
    await this.productRepository.updateStock(updateStock)
  }
}