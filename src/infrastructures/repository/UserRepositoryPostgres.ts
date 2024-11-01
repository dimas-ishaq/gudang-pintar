import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/entities/User";
import { pool } from "../database/postgres/pool";

export default class UserRepositoryPostgres implements UserRepository {

  async create(user: User): Promise<User> {
    const query = {
      text: 'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3,$4,$5) RETURNING id, name, email, role',
      values: [user.id, user.name, user.email, user.password, user.role]
    }
    const result = await pool.query(query);
    return result.rows[0]
  }

  async findById(id: string): Promise<User | null> {
    const query = {
      text: 'SELECT * FROM users WHERE id =$1',
      values: [id]
    }
    const result = await pool.query(query);
    if (result.rowCount !== null && result.rowCount > 0) {
      return result.rows[0]
    }
    return null
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    }
    const result = await pool.query(query)
    if (result.rowCount !== null && result.rowCount > 0) {
      return result.rows[0]
    }
    return null
  }

  async findAll(): Promise<User[]> {
    const query = {
      text: 'SELECT * FROM users ',
    }
    const result = await pool.query(query)
    return result.rows
  }

  async update(user: User): Promise<User> {
    const fieldsToUpdate = [];
    const values = [];
    let index = 1;

    // Menambahkan kolom yang ingin di-update ke dalam array
    if (user.name) {
      fieldsToUpdate.push(`name = $${index}`);
      values.push(user.name);
      index++;
    }
    if (user.email) {
      fieldsToUpdate.push(`email = $${index}`);
      values.push(user.email);
      index++;
    }
    if (user.password) {
      fieldsToUpdate.push(`password = $${index}`);
      values.push(user.password);
      index++;
    }

    // Jika tidak ada kolom yang di-update, return error atau handle sesuai kebutuhan
    if (fieldsToUpdate.length === 0) {
      throw new Error('No fields to update');
    }

    // Menambahkan id sebagai syarat WHERE
    values.push(user.id);

    const query = {
      text: `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = $${index} RETURNING id, name, email, role`, // Menyusun query dinamis
      values, // Menggunakan nilai yang sesuai
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = {
      text: 'DELETE FROM users WHERE id =$1',
      values: [id]
    }
    await pool.query(query)
  }
}