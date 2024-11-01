
import { nanoid } from "nanoid";
import { NextFunction, Request, Response } from "express";
import CreateUserUseCase from "../../../../application/usecase/user/CreateUserUseCase";
import GetUserUseCase from "../../../../application/usecase/user/GetUserUseCase";
import UpdateUserUseCase from "../../../../application/usecase/user/UpdateUserUseCase";
import DeleteUserUseCase from "../../../../application/usecase/user/DeleteUserUseCase";
import { createUserSchema, updateUserSchema } from "../validations/userSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import PasswordHash from "../../../../infrastructures/services/PasswordHash";
import GetAllUserUseCase from "../../../../application/usecase/user/GetAllUserUseCase";
import User from "../../../../domain/entities/User";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";

interface CustomRequest extends Request {
  payload?: string | object; // Sesuaikan dengan tipe data dari payload token
}
export default class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private passwordHash: PasswordHash,
    private getAllUserUseCase: GetAllUserUseCase
  ) { }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createUserSchema.validate(req.body)

      if (error) {
        throw new BadRequestError(error.message)
      }

      const { name, email, password, role } = req.body
      const hashedPassword = await this.passwordHash.hash(password)
      const id = `user-${nanoid(16)}`
      const user = await this.createUserUseCase.execute({ id, name, email, password: hashedPassword, role })
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }

      })
    } catch (error) {
      next(error);
    }
  }
  async getUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.payload as { id: string }
      if (!id) {
        throw new NotFoundError('Id user not found')
      }
      const user = await this.getUserUseCase.execute(id)
      return res.status(200).json({
        status: 'success',
        data: {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id user not found')
      }
      const user = await this.getUserUseCase.execute(id)
      return res.status(200).json({
        status: 'success',
        data: {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getAllUserUseCase.execute()
      return res.status(200).json({
        status: 'success',
        data: users.map((user) => ({
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }))
      })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { error } = updateUserSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const { id } = req.payload as { id: string }
      const user = await this.updateUserUseCase.execute({ id, ...req.body });
      return res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async updateUserById(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { error } = updateUserSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id user not found')
      }
      const user = await this.updateUserUseCase.execute({ id, ...req.body });
      return res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id user not found')
      }
      await this.deleteUserUseCase.execute(id)
      return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

}