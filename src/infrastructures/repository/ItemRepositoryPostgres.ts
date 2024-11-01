import Item from "../../domain/entities/Item";
import ItemRepository from "../../domain/repositories/ItemRepository";
import { pool } from "../database/postgres/pool";




export default class ItemRepositoryPostgres implements ItemRepository {

  async create(item: Item): Promise<Item> {
    const query = {
      text: 'INSERT INTO items (id, transaction_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING product_id, quantity, price',
      values: [item.id, item.transaction_id, item.product_id, item.quantity, item.price]
    }
    const result = await pool.query(query)
    return result.rows[0]
  }
  async findByIdTransaction(id: string): Promise<any> {
    const query = {
      text: `
        SELECT 
            p.name AS product_name, 
            i.quantity, 
            (i.price * i.quantity) AS total_price 
        FROM 
            transactions t
        JOIN 
            items i ON t.id = i.transaction_id
        JOIN 
            products p ON i.product_id = p.id
        WHERE 
            t.id = $1
      `,
      values: [id]
    };

    const result = await pool.query(query)
    return result.rows
  }
}