import Session from "../entities/Session"

export default interface SessionRepository {
  add(userData: Session): Promise<void>;
  delete(user_id: string): Promise<void>
}