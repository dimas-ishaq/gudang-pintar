import UserRepository from "../../../domain/repositories/UserRepository";



export default class GetAllUserUseCase {

  constructor(private userRepository: UserRepository) { }

  async execute() {
    return await this.userRepository.findAll()
  }
}