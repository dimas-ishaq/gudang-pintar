
import Category from "../../domain/entities/Category";
import CategoryRepository from "../../domain/repositories/CategoryRepository";
import { pool } from "../database/postgres/pool";

export default class CategoryRepositoryPostgres implements CategoryRepository {

  async create(category: Category): Promise<Category> {
    const query = {
      text: 'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *',
      values: [category.id, category.name]
    }
    const result = await pool.query(query)
    return result.rows[0]

  }

  async findById(id: string): Promise<Category> {
    const query = {
      text: 'SELECT * FROM categories WHERE id=$1',
      values: [id]
    }
    const result = await pool.query(query)
    return result.rows[0]
  }

  async findByName(name: string): Promise<Category> {
    const query = {
      text: 'SELECT * FROM categories WHERE name=$1',
      values: [name]
    }
    const result = await pool.query(query)
    return result.rows[0]
  }

  async findAll(): Promise<Category[]> {
    const query = {
      text: 'SELECT * FROM categories'
    }
    const result = await pool.query(query)
    return result.rows
  }

  async update(category: Category): Promise<Category> {
    const query = {
      text: 'UPDATE categories SET name=$2 WHERE id=$1 RETURNING *',
      values: [category.id, category.name]
    }
    const result = await pool.query(query)
    return result.rows[0]
  }

  async delete(id: string): Promise<void> {
    const query = {
      text: 'DELETE FROM categories WHERE id=$1',
      values: [id]
    }
    await pool.query(query)
  }

}