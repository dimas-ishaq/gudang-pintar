import User from "../../../domain/entities/User";
import UserRepository from "../../../domain/repositories/UserRepository";
import ConflictError from "../../../domain/exceptions/ConflictError";

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export default class RegisterUseCase{
  constructor(private userRepository: UserRepository){}

  async execute(userData: UserData):Promise<User>{
    const user = new User(userData)
    const isEmailAlreadyRegistered = await this.userRepository.findByEmail(user.email)
    if(isEmailAlreadyRegistered){
      throw new ConflictError('Email address already registered')
    }
    return this.userRepository.create(user)

  }
}