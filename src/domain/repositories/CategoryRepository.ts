import Category from "../entities/Category";


export default interface CategoryRepository {
  create(category: Category): Promise<Category>;
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}