import SessionRepository from "../../../domain/repositories/SessionRepository";



export default class LogoutUseCase {
  constructor(private sessionRepository: SessionRepository) { }

  async execute(user_id: string): Promise<void> {
    return await this.sessionRepository.delete(user_id)
  }
}