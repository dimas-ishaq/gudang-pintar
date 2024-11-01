
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ProductRepository from "../../../domain/repositories/ProductRepository";




export default class UpdateInventoryUseCase {
  constructor(private productRepository: ProductRepository) { }

  async execute(inventoryUpdate: { id: string, stock: number, updated_at: string }): Promise<void> {
    const { id, stock, updated_at } = inventoryUpdate
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const updateInventory = {
      id: id,
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: stock,
      description: product.description,
      created_at: product.created_at,
      updated_at: updated_at

    }
    await this.productRepository.update(updateInventory)
  }
}