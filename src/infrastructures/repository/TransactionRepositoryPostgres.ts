import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../domain/repositories/TransactionRepository";
import { pool } from "../database/postgres/pool";

interface TransactionResult {
  transactions: any;
  items: any;
}
interface Report {
  start_date: string,
  end_date: string,
  type: string
}

export default class TransactionRepositoryPostgres implements TransactionRepository {

  async create(transaction: Transaction): Promise<Transaction> {
    const query = {
      text: 'INSERT INTO transactions (id, user_id, type, date) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [transaction.id, transaction.user_id, transaction.type, transaction.date]
    }
    const result = await pool.query(query);
    return result.rows[0]
  }
  async findAll(): Promise<TransactionResult> {
    const transactions_query = {
      text: `SELECT * FROM transactions`
    }
    const items_query = {
      text: `SELECT * FROM items`
    }
    const transactions = (await pool.query(transactions_query)).rows
    const items = (await pool.query(items_query)).rows
    return { transactions, items }
  }

  async findByQuery(report: Report): Promise<any> {
    const query = {
      text: `SELECT * FROM transactions WHERE date >= $1 AND date <= $2 AND type= $3`,
      values: [report.start_date, report.end_date, report.type]
    }
    const result = await pool.query(query)
    return result.rows
  }

  async findByCategoryName(category_name: string): Promise<any> {
    const query = {
      text: `SELECT p.id, p.name, c.name AS category_name, p.stock 
             FROM products p
             INNER JOIN categories c ON p.category_id = c.id 
             WHERE c.name = $1`,
      values: [category_name]
    };

    const result = await pool.query(query);
    return result.rows;
  }
}