import Product from "../entities/Product"


export default interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  updateStock({ id, stock }: {
    id: string, stock: number
  }): Promise<void>;
  delete(id: string): Promise<void>
}