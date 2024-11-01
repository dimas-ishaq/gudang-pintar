import UserRepository from "../../../domain/repositories/UserRepository";
import TokenManager from "../../../infrastructures/services/TokenManager";
import AuthenticationError from "../../../domain/exceptions/AuthenticationError";
import PasswordHash from "../../../infrastructures/services/PasswordHash";
import SessionRepository from "../../../domain/repositories/SessionRepository";

interface userData {
  email: string,
  password: string
}


export default class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenManager: TokenManager,
    private passwordHash: PasswordHash,
    private sessionRepository: SessionRepository) { }

  async execute({ email, password }: userData) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AuthenticationError('User not found')
    }
    const isPasswordMatch = await this.passwordHash.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new AuthenticationError('Invalid password')
    }
    if (user && user.id) {
      const token = this.tokenManager.generateToken(user.id, user.role);
      if (token?.accessToken && token.refreshToken) {
        await this.sessionRepository.add({ user_id: user.id, refresh_token: token?.refreshToken, role: user.role })
        return token;
      }
    } else {
      throw new Error('User ID is missing');
    }
  }
}