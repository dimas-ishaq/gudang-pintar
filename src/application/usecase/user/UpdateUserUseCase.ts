import UserRepository from "../../../domain/repositories/UserRepository";
import User from "../../../domain/entities/User";
import BadRequestError from "../../../domain/exceptions/BadRequestError";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import bcrypt from 'bcrypt';

interface UserData {
  id: string,
  name?: string,
  email?: string,
  password?: string,
}
export default class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(userData: UserData): Promise<User> {
    const { id, name, email, password } = userData

    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const requiredProperties = ['name', 'email', 'password']; // List of required properties (adjust as needed)

    // Check if at least one required property is present
    if (!Object.keys(userData).some(key => requiredProperties.includes(key))) {
      throw new BadRequestError('At least one of the following properties must be provided: ' + requiredProperties.join(', '));
    }
    const updateData = {
      id,
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? await bcrypt.hash(password, 10) : user.password,
      role: user.role
    }

    return await this.userRepository.update(updateData)
  }
}