import UserRepository from "../../../domain/repositories/UserRepository";
import User from "../../../domain/entities/User";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class GetUserUseCase {
  constructor(private userRepository: UserRepository) { }


  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundError(`User not found`)
    }
    return user
  }

}