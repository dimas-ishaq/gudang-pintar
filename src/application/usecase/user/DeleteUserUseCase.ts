import UserRepository from "../../../domain/repositories/UserRepository";
import BadRequestError from "../../../domain/exceptions/BadRequestError";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class DeleteUserUseCase{
  constructor(private userRepository: UserRepository){}

  async execute(id:string):Promise<void>{
    const user = await this.userRepository.findById(id)
    if(!user){
      throw new NotFoundError('User not found')
    }
    await this.userRepository.delete(id)
  }
}