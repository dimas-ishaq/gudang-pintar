import Product from "../../../domain/entities/Product";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ProductRepository from "../../../domain/repositories/ProductRepository";
import BadRequestError from "../../../domain/exceptions/BadRequestError";


interface productUpdate {
  id: string,
  name?: string,
  category_id?: string,
  price?: number,
  stock?: number,
  description?: string,
  updated_at: string
}
export default class UpdateProductUseCase {

  constructor(private productRepository: ProductRepository) { }

  async execute(productUpdate: productUpdate): Promise<Product> {
    const { id, name, category_id, price, stock, description, updated_at } = productUpdate
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const requiredProperties = ['name', 'categoryId', 'price', 'stock', 'description']; // List of required properties (adjust as needed)

    // Check if at least one required property is present
    if (!Object.keys(productUpdate).some(key => requiredProperties.includes(key))) {
      throw new BadRequestError('At least one of the following properties must be provided: ' + requiredProperties.join(', '));
    }

    const updateProduct = {
      id: id,
      name: name ? name : product.name,
      category_id: category_id ? category_id : product.category_id,
      price: price ? price : product.price,
      stock: stock ? stock : product.stock,
      description: description ? description : product.description,
      created_at: product.created_at,
      updated_at: updated_at ? updated_at : product.updated_at
    }
    return await this.productRepository.update(updateProduct)
  }
}