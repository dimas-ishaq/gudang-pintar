import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/repositories/ProductRepository";
import { pool } from "../database/postgres/pool";



export default class ProductRepositoryPostgres implements ProductRepository {

  async create(product: Product): Promise<Product> {
    const query = {
      text: `INSERT INTO products (id, name, category_id, price, stock, description) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [product.id, product.name, product.category_id, product.price, product.stock, product.description]
    }
    const result = await pool.query(query)
    return result.rows[0]

  }

  async findById(id: string): Promise<Product> {
    const query = {
      text: `SELECT products.id, products.name, categories.name as category_name, category_id, 
      products.price, products.stock, products.description FROM products INNER JOIN categories ON 
      products.category_id = categories.id WHERE products.id = $1`,
      values: [id]
    }
    const result = await pool.query(query)
    return result.rows[0]

  }

  async findAll(): Promise<Product[]> {
    const query = {
      text: `SELECT products.id, products.name, categories.name as category_name, 
      products.price, products.stock FROM products INNER JOIN categories ON 
      products.category_id = categories.id`,
    }
    const result = await pool.query(query)
    return result.rows

  }
  async update(product: Product): Promise<Product> {
    const fieldsToUpdate = [];
    const values = [];
    let index = 1;

    // Menambahkan kolom yang ingin di-update ke dalam array
    if (product.name) {
      fieldsToUpdate.push(`name = $${index}`);
      values.push(product.name);
      index++;
    }
    if (product.category_id) {
      fieldsToUpdate.push(`category_id = $${index}`);
      values.push(product.category_id);
      index++;
    }
    if (product.price) {
      fieldsToUpdate.push(`price = $${index}`);
      values.push(product.price);
      index++;
    }
    if (product.stock) {
      fieldsToUpdate.push(`stock = $${index}`);
      values.push(product.stock);
      index++;
    }
    if (product.description) {
      fieldsToUpdate.push(`description = $${index}`);
      values.push(product.description);
      index++;
    }
    if (product.updated_at) {
      fieldsToUpdate.push(`updated_at = $${index}`);
      values.push(product.updated_at);
      index++;
    }

    // Jika tidak ada kolom yang di-update, return error atau handle sesuai kebutuhan
    if (fieldsToUpdate.length === 0) {
      throw new Error('No fields to update');
    }

    // Menambahkan id sebagai syarat WHERE
    values.push(product.id);

    const query = {
      text: `UPDATE products SET ${fieldsToUpdate.join(', ')} WHERE id = $${index} RETURNING *`, // Menyusun query dinamis
      values, // Menggunakan nilai yang sesuai
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async updateStock({ id, stock }: { id: string; stock: number; }): Promise<void> {
    const query = {
      text: `UPDATE products SET stock = $2 WHERE id=$1`,
      values: [id, stock]
    }
    await pool.query(query)
  }


  async delete(id: string): Promise<void> {
    const query = {
      text: 'DELETE FROM products WHERE id=$1',
      values: [id]
    }
    await pool.query(query)

  }
}