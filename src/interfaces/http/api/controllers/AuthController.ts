import LoginUseCase from "../../../../application/usecase/auth/LoginUseCase";
import RegisterUseCase from "../../../../application/usecase/auth/RegisterUseCase";
import { Request, Response, NextFunction } from "express";
import { loginUserSchema, createUserSchema } from "../validations/userSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";
import PasswordHash from "../../../../infrastructures/services/PasswordHash";
import LogoutUseCase from "../../../../application/usecase/auth/LogoutUseCase";

interface CustomRequest extends Request {
  payload?: string | object
}

export default class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
    private passwordHash: PasswordHash,
    private logoutUseCase: LogoutUseCase
  ) { }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = loginUserSchema.validate(req.body)

      if (error) {
        throw new BadRequestError(error.message)
      }

      const { email, password } = req.body
      const result = await this.loginUseCase.execute({ email, password })
      res.cookie('refresh_token', result?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
      })
      return res.status(200).json({
        status: 'success',
        data: {
          token: result?.accessToken
        }
      })
    } catch (error) {
      next(error)
    }

  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createUserSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }

      const { name, email, password, role } = req.body
      const hashedPassword = await this.passwordHash.hash(password)
      const id = `user-${nanoid(16)}`
      const result = await this.registerUseCase.execute({ id, name, email, password: hashedPassword, role })
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
          userId: result.id,
          name: result.name,
          email: result.email,
          role: result.role
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async logout(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.payload as { id: string }
      await this.logoutUseCase.execute(id)
      return res.status(200).json({
        status: 'success',
        message: 'User logout successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}