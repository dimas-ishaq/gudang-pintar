

import Session from "../../domain/entities/Session";
import SessionRepository from "../../domain/repositories/SessionRepository";
import { pool } from "../database/postgres/pool";

export default class SessionRepositoryPostgres implements SessionRepository {

  async add(userData: Session): Promise<void> {
    const query = {
      text: `
        INSERT INTO session (user_id, refresh_token, role) 
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id) 
        DO UPDATE SET refresh_token = EXCLUDED.refresh_token, role = EXCLUDED.role
      `,
      values: [userData.user_id, userData.refresh_token, userData.role]
    };
    await pool.query(query)
  }

  async delete(user_id: string): Promise<void> {
    const query = {
      text: 'DELETE FROM session WHERE user_id = $1',
      values: [user_id]
    }
    await pool.query(query)
  }

}