import { NextFunction, Request, Response } from "express";
import { createCategorySchema, updateCategorySchema } from "../validations/categorySchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";
import CreateCategoryUseCase from "../../../../application/usecase/category/CreateCategoryUseCase";
import GetAllCategoryUseCase from "../../../../application/usecase/category/GetAllCategoryUseCase";
import UpdateCategoryUseCase from "../../../../application/usecase/category/UpdateCategoryUseCase";
import DeleteCategoryUseCase from "../../../../application/usecase/category/DeleteCategoryUseCase";
import Category from "../../../../domain/entities/Category";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";



export default class CategoryController {

  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getAllCategoryUseCase: GetAllCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) { }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createCategorySchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `category-${nanoid(16)}`
      const category = await this.createCategoryUseCase.execute({ id, ...req.body })
      return res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        data: {
          categoryId: category.id,
          name: category.name
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.getAllCategoryUseCase.execute()
      return res.status(200).json({
        status: 'success',
        data: categories.map((category) => ({
          categoryId: category.id,
          name: category.name
        }))
      })
    } catch (error) {
      next(error)
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id category not found')
      }
      const { error } = updateCategorySchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const category = await this.updateCategoryUseCase.execute({ id, ...req.body })
      return res.status(200).json({
        status: 'success',
        message: 'Category updated successfully',
        data: {
          categoryId: category.id,
          name: category.name
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id category not found')
      }
      await this.deleteCategoryUseCase.execute(id)
      return res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}